const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');
const { loadTypeScript } = require('./helpers/loadTypeScript.cjs');
const { appreciationForDay, monthCells, upcomingPlans } = loadTypeScript(path.resolve(__dirname, '../src/utils/planning.ts'));
const { quizzes } = loadTypeScript(path.resolve(__dirname, '../src/constants/quizzes.ts'));
const { emptyQuizEntry } = loadTypeScript(path.resolve(__dirname, '../src/utils/quizzes.ts'));
const { appreciationIdeas, PLANNING_COPY } = loadTypeScript(path.resolve(__dirname, '../src/constants/planning.ts'));

test('reminders use the partner result, not the user’s own preference', () => {
  const entry = emptyQuizEntry();
  for (const question of quizzes['love-language'].questions) {
    entry.answers.partner[question.id] = 'help';
    entry.answers.you[question.id] = 'words';
  }
  entry.submitted.partner = true;
  const reminder = appreciationForDay(entry, '2026-10-18');
  assert.equal(reminder.style, 'Acts of service');
  assert.ok(appreciationIdeas.help.includes(reminder.text));
  assert.deepEqual(reminder, appreciationForDay(entry, '2026-10-18'));
});

test('a missing or unfinished partner result gets a general reminder', () => {
  const entry = emptyQuizEntry();
  entry.answers.you.day = 'help';
  assert.equal(appreciationForDay(entry, '2026-10-18').style, null);
  assert.equal(appreciationForDay(undefined, '2026-10-18').text, PLANNING_COPY.generic);
});

test('calendar uses Monday-first weeks and includes leap days', () => {
  const february = monthCells(2024, 1);
  assert.equal(february[3], '2024-02-01');
  assert.ok(february.includes('2024-02-29'));
  assert.equal(february.filter(Boolean).length, 29);
  assert.equal(february.length % 7, 0);
  assert.equal(monthCells(2026, 5)[0], '2026-06-01');
});

test('upcoming plans exclude past days, sort by date/time, and preserve the source array', () => {
  const plans = [{title:'Late',date:'2026-10-20',time:'19:00'}, {title:'Past',date:'2026-10-17'}, {title:'Today',date:'2026-10-18'}, {title:'Early',date:'2026-10-20',time:'10:00'}];
  assert.deepEqual(upcomingPlans(plans, '2026-10-18').map(plan=>plan.title), ['Today','Early','Late']);
  assert.equal(plans[0].title,'Late');
});
