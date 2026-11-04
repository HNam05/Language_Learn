import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:net';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

test('Windows starter serves offline modules and seekable audio, rejects paths outside app', { skip: process.platform !== 'win32', timeout: 20000 }, async t => {
  const reservation = createServer();
  reservation.listen(0, '127.0.0.1');
  await once(reservation, 'listening');
  const port = reservation.address().port;
  await new Promise(resolve => reservation.close(resolve));
  const server = spawn('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', fileURLToPath(new URL('../scripts/start.ps1', import.meta.url)), '-NoBrowser', '-Port', String(port)], { windowsHide: true });
  t.after(async () => {
    if (server.exitCode === null) { const closed = once(server, 'exit'); server.kill(); await closed; }
  });
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Server startup timeout')), 10000);
    let output = '';
    const fail = error => { clearTimeout(timer); reject(error); };
    server.once('error', fail);
    server.once('exit', code => fail(new Error(`Server exited: ${code} ${output}`)));
    server.stderr.on('data', data => { output += data; });
    server.stdout.on('data', data => {
      output += data;
      if (output.includes('Adresse:')) { clearTimeout(timer); resolve(); }
    });
  });
  const request = (path, options) => fetch(`http://127.0.0.1:${port}${path}`, { ...options, signal: AbortSignal.timeout(4000) });
  const home = await request('/');
  assert.equal(home.status, 200);
  assert.match(await home.text(), /Schritt für Schritt/u);
  const module = await request('/src/main.js');
  assert.match(module.headers.get('content-type'), /javascript/u);
  await module.arrayBuffer();
  const path = '/assets/audio/termine-dialog.wav';
  const original = readFileSync(new URL(`../app${path}`, import.meta.url));
  for (const [range, start, end] of [['bytes=0-43', 0, 43], ['bytes=100-', 100, original.length - 1], ['bytes=-20', original.length - 20, original.length - 1]]) {
    const response = await request(path, { headers: { Range: range } });
    assert.equal(response.status, 206, range);
    assert.equal(response.headers.get('content-range'), `bytes ${start}-${end}/${original.length}`);
    assert.equal(response.headers.get('accept-ranges'), 'bytes');
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), original.subarray(start, end + 1));
  }
  for (const range of [`bytes=${original.length}-`, 'bytes=10-2', 'bytes=-0', 'bytes=999999999999999999999999-', 'bytes=invalid']) {
    const response = await request(path, { headers: { Range: range } });
    assert.equal(response.status, 416, range);
    assert.equal(response.headers.get('content-range'), `bytes */${original.length}`);
    await response.arrayBuffer();
  }
  const head = await request(path, { method: 'HEAD', headers: { Range: 'bytes=0-43' } });
  assert.equal(head.status, 200);
  assert.equal(Number(head.headers.get('content-length')), original.length);
  assert.equal((await head.arrayBuffer()).byteLength, 0);
  for (const path of ['/../AGENTS.md', '/%2e%2e%5cAGENTS.md', '/.git/config', '/index.html:secret']) {
    const response = await request(path);
    assert.ok([403, 404].includes(response.status), `${path}: ${response.status}`);
    await response.arrayBuffer();
  }
  const post = await request('/', { method: 'POST' });
  assert.equal(post.status, 405);
  await post.arrayBuffer();
});
