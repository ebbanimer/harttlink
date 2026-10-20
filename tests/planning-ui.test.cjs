const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { loadTypeScript } = require('./helpers/loadTypeScript.cjs');
const { ClosebyProvider } = loadTypeScript(path.resolve(__dirname, '../src/state/ClosebyProvider.tsx'));
const { AppreciationReminder } = loadTypeScript(path.resolve(__dirname, '../src/components/AppreciationReminder.tsx'));
const { CalendarScreen } = loadTypeScript(path.resolve(__dirname, '../src/screens/CalendarScreen.tsx'));
const { quizzes } = loadTypeScript(path.resolve(__dirname, '../src/constants/quizzes.ts'));
const { emptyQuizEntry } = loadTypeScript(path.resolve(__dirname, '../src/utils/quizzes.ts'));
const { todayKey } = loadTypeScript(path.resolve(__dirname, '../src/utils/dates.ts'));

function render(Component, saved = {}) {
  global.localStorage = { getItem: key => key in saved ? JSON.stringify(saved[key]) : null };
  try { return renderToStaticMarkup(React.createElement(ClosebyProvider,null,React.createElement(Component))); }
  finally { delete global.localStorage; }
}

test('start-page reminder renders the saved partner style and saved completion', () => {
  const entry = emptyQuizEntry();
  for (const question of quizzes['love-language'].questions) entry.answers.partner[question.id] = 'help';
  entry.submitted.partner = true;
  const html = render(AppreciationReminder, { 'closeby-quizzes-v1': { 'love-language': entry }, 'closeby-appreciation-days': [todayKey()] });
  assert.match(html, /Acts of service/);
  assert.match(html, /A little love, given/);
  assert.match(html, /Undo/);
});

test('calendar renders existing saved dates, including time and notes', () => {
  const html = render(CalendarScreen, { 'closeby-plans': [{title:'Dinner together',date:todayKey(),time:'19:30',notes:'Our favorite place'}] });
  assert.match(html, /Dinner together/);
  assert.match(html, /19:30/);
  assert.match(html, /Our favorite place/);
  assert.match(html, /Edit date: Dinner together/);
  assert.match(html, /Remove date: Dinner together/);
  assert.match(html, /aria-pressed="true"/);
});
