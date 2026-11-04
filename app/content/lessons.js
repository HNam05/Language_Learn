import { legacyLessons } from './legacy-lessons.js';
import { a1m01Lessons } from './a1/m01.js';
import { a1m02Lessons } from './a1/m02.js';
import { a1m03Lessons } from './a1/m03.js';
import { a1m04Lessons } from './a1/m04.js';
import { a1m05Lessons } from './a1/m05.js';
import { a1m06Lessons } from './a1/m06.js';
import { a1m07Lessons } from './a1/m07.js';
import { a1m08Lessons } from './a1/m08.js';
import { a1m09Lessons } from './a1/m09.js';
import { a1m10Lessons } from './a1/m10.js';
import { a1m11Lessons } from './a1/m11.js';
import { a1m12Lessons } from './a1/m12.js';
import { courseModules } from './course.js';

// Shared public export. Add future module arrays to content; preserve legacy IDs.
const content = new Map([...legacyLessons, ...a1m01Lessons, ...a1m02Lessons, ...a1m03Lessons, ...a1m04Lessons, ...a1m05Lessons, ...a1m06Lessons, ...a1m07Lessons, ...a1m08Lessons, ...a1m09Lessons, ...a1m10Lessons, ...a1m11Lessons, ...a1m12Lessons].map(lesson => [lesson.id, lesson]));
export const lessons = [...courseModules].sort((a, b) => a.order - b.order).flatMap(module =>
  module.lessonIds.map(id => {
    const lesson = content.get(id);
    if (!lesson) throw new Error(`Unknown lesson in ${module.id}: ${id}`);
    return { ...lesson, moduleId: module.id, moduleOrder: module.order,
      moduleTitle: module.title, moduleGoal: module.goals[0]?.text || '',
      goalIds: module.goals.map(goal => goal.id), skills: module.skills };
  })
);
if (new Set(lessons.map(lesson => lesson.id)).size !== content.size || lessons.length !== content.size) {
  throw new Error('Every lesson must belong to exactly one course module.');
}
