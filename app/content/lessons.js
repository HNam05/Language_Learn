import { legacyLessons } from './legacy-lessons.js';
import { a1m01Lessons } from './a1/m01.js';
import { a1m02Lessons } from './a1/m02.js';
import { a1m03Lessons } from './a1/m03.js';
import { courseModules } from './course.js';

// Shared public export. Add future module arrays to content; preserve legacy IDs.
const content = new Map([...legacyLessons, ...a1m01Lessons, ...a1m02Lessons, ...a1m03Lessons].map(lesson => [lesson.id, lesson]));
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
