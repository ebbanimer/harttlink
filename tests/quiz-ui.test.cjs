const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { loadTypeScript } = require('./helpers/loadTypeScript.cjs');
const { QuizRunner } = loadTypeScript(path.resolve(__dirname, '../src/components/QuizRunner.tsx'));
const { ClosebyProvider } = loadTypeScript(path.resolve(__dirname, '../src/state/ClosebyProvider.tsx'));

function renderQuiz(quizId) {
  return renderToStaticMarkup(React.createElement(ClosebyProvider, null, React.createElement(QuizRunner, { quizId })));
}

test('partner quiz starts with self-answer wording and gates the guessing round', () => {
  const html = renderQuiz('quiz');
  assert.match(html, /What would you choose for a perfect date/);
  assert.match(html, /disabled="">Your guesses/);
  assert.equal((html.match(/type="radio"/g) ?? []).length, 4);
});

test('affection quiz has selectable options and requires an answer before advancing', () => {
  const html = renderQuiz('love-language');
  assert.equal((html.match(/type="radio"/g) ?? []).length, 5);
  assert.match(html, /class="primary" disabled="">Next question/);
});

test('a saved answer is restored as selected when reopening the quiz', () => {
  global.localStorage = { getItem: key => key === 'closeby-quizzes-v1' ? JSON.stringify({ 'love-language': { answers: { you: { day: 'time' }, partner: {} }, submitted: { you: false, partner: false } } }) : null };
  try {
    const html = renderQuiz('love-language');
    assert.match(html, /checked=""/);
    assert.match(html, /class="primary">Next question/);
  } finally { delete global.localStorage; }
});

test('would-you-rather is answerable in the app with two choices', () => {
  assert.equal((renderQuiz('rather').match(/type="radio"/g) ?? []).length, 2);
});
