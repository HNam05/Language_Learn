// Metadata only: the shared lesson aggregator imports this registry.

export const courseModules = [
  {
    id: 'a1-m01', cefr: 'A1', order: 1, title: 'Kontakt aufnehmen',
    status: 'pilot', prerequisites: [], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction', 'mediation'],
    goals: [
      { id: 'a1-m01-g01', text: 'Ich kann meinen Namen, meine Herkunft und meinen Wohnort nennen.' },
      { id: 'a1-m01-g02', text: 'Ich kann einfache Angaben in einem Formular lesen und selbst eintragen.' },
      { id: 'a1-m01-g03', text: 'Ich kann höflich mit „Sie“ nach Namen, Herkunft und Wohnort fragen.' },
      { id: 'a1-m01-g04', text: 'Ich kann meinen Namen buchstabieren und einen buchstabierten Namen verstehen.' },
      { id: 'a1-m01-g05', text: 'Ich kann mich kurz schriftlich vorstellen und eine neue Person kennenlernen.' }
    ],
    // All six slots exist; stays 'pilot' until the human review in docs/curriculum/modules/a1-m01.md.
    lessonIds: ['vorstellen', 'a1-m01-l02', 'a1-m01-l03', 'a1-m01-l04', 'a1-m01-l05', 'a1-m01-l06'], checkpointId: null
  },
  {
    id: 'a1-m02', cefr: 'A1', order: 2, title: 'Person und Familie',
    status: 'pilot', prerequisites: ['a1-m01'], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction', 'mediation'],
    goals: [
      { id: 'a1-m02-g01', text: 'Ich kann meine Familie mit einfachen Sätzen beschreiben.' },
      { id: 'a1-m02-g02', text: 'Ich kann einfache Angaben über eine Person lesen und über sie mit er oder sie sprechen.' },
      { id: 'a1-m02-g03', text: 'Ich kann Zahlen bis 100, ein Alter und eine Telefonnummer verstehen und nennen.' },
      { id: 'a1-m02-g04', text: 'Ich kann Kontaktangaben weitergeben und eine Angehörige vorstellen.' }
    ],
    // Stays 'pilot' until the human review in docs/curriculum/modules/a1-m02.md.
    lessonIds: ['a1-m02-l01', 'a1-m02-l02', 'a1-m02-l03', 'a1-m02-l04', 'a1-m02-l05', 'a1-m02-l06'], checkpointId: null
  },
  {
    id: 'a1-m03', cefr: 'A1', order: 3, title: 'Dinge und Sprache',
    status: 'pilot', prerequisites: ['a1-m02'], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction'],
    goals: [
      { id: 'a1-m03-g01', text: 'Ich kann nach einem Gegenstand fragen und ihn mit ein oder eine benennen.' },
      { id: 'a1-m03-g02', text: 'Ich kann einfache Schilder und Hinweise verstehen.' },
      { id: 'a1-m03-g03', text: 'Ich kann sagen, dass ich etwas nicht verstehe, und um Wiederholung oder Hilfe bitten.' },
      { id: 'a1-m03-g04', text: 'Ich kann einen Gegenstand mit Farbe und Größe beschreiben und mit nicht oder kein verneinen.' }
    ],
    // Stays 'pilot' until the human review in docs/curriculum/modules/a1-m03.md.
    lessonIds: ['a1-m03-l01', 'a1-m03-l02', 'a1-m03-l03', 'a1-m03-l04', 'a1-m03-l05', 'a1-m03-l06'], checkpointId: null
  },
  {
    id: 'a1-m04', cefr: 'A1', order: 4, title: 'Zeit und Termine',
    status: 'pilot', prerequisites: ['a1-m03'], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction'],
    goals: [{ id: 'a1-m04-g01', text: 'Ich kann einen einfachen Termin verstehen und vereinbaren.' }],
    lessonIds: ['termine'], checkpointId: null
  },
  {
    id: 'a1-m06', cefr: 'A1', order: 6, title: 'Essen und Einkauf',
    status: 'pilot', prerequisites: ['a1-m04'], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction'],
    goals: [{ id: 'a1-m06-g01', text: 'Ich kann einen einfachen Einkaufswunsch ausdrücken.' }],
    lessonIds: ['einkaufen'], checkpointId: null
  },
  {
    id: 'a1-m12', cefr: 'A1', order: 12, title: 'Gestern und morgen',
    status: 'pilot', prerequisites: ['a1-m06'], skills: ['reading', 'listening', 'writing', 'speaking'],
    goals: [{ id: 'a1-m12-g01', text: 'Ich kann kurz über gestern berichten.' }],
    lessonIds: ['gestern'], checkpointId: null
  }
];
