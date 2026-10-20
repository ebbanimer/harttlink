const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');
const { loadTypeScript } = require('./helpers/loadTypeScript.cjs');
const { emptyQuizEntry, isRoundComplete, matchingAnswers, affectionScores } = loadTypeScript(path.resolve(__dirname, '../src/utils/quizzes.ts'));
const { quizzes, affectionStyles } = loadTypeScript(path.resolve(__dirname, '../src/constants/quizzes.ts'));
const { items } = loadTypeScript(path.resolve(__dirname, '../src/constants/content.ts'));

test('every quiz card resolves to unique answerable questions and valid affection styles', () => {
  for (const item of items.filter(item => item.category === 'Quizzes')) {
    const quiz = quizzes[item.quizId ?? item.id];
    assert.ok(quiz);
    assert.ok(quiz.questions.length > 0);
    assert.equal(new Set(quiz.questions.map(question => question.id)).size, quiz.questions.length);
    for (const question of quiz.questions) {
      assert.ok(question.options.length >= 2);
      assert.equal(new Set(question.options.map(option => option.id)).size, question.options.length);
      for (const option of question.options) if (option.trait) assert.ok(affectionStyles[option.trait]);
    }
  }
});

test('unanswered or invalid options do not count as a completed round', () => {
  const quiz = quizzes.quiz;
  const entry = emptyQuizEntry();
  assert.equal(isRoundComplete(quiz, entry, 'partner'), false);
  for (const question of quiz.questions) entry.answers.partner[question.id] = question.options[0].id;
  assert.equal(isRoundComplete(quiz, entry, 'partner'), true);
  entry.answers.partner[quiz.questions[0].id] = 'removed-option';
  assert.equal(isRoundComplete(quiz, entry, 'partner'), false);
});

test('partner results compare real answers, never invented correct answers', () => {
  const quiz = quizzes.quiz;
  const entry = emptyQuizEntry();
  assert.equal(matchingAnswers(quiz, entry), 0);
  for (const question of quiz.questions) {
    entry.answers.you[question.id] = question.options[0].id;
    entry.answers.partner[question.id] = question.options[0].id;
  }
  assert.equal(matchingAnswers(quiz, entry), quiz.questions.length);
  entry.answers.partner[quiz.questions[0].id] = quiz.questions[0].options[1].id;
  assert.equal(matchingAnswers(quiz, entry), quiz.questions.length - 1);
});

test('affection results retain tied preferences and ignore missing answers', () => {
  const quiz = quizzes['love-language'];
  assert.deepEqual(affectionScores(quiz, {}), []);
  const answers = {};
  for (let index = 0; index < 4; index++) answers[quiz.questions[index].id] = index < 2 ? 'words' : 'time';
  assert.deepEqual(affectionScores(quiz, answers), [['words', 2], ['time', 2]]);
  answers[quiz.questions[4].id] = 'time';
  assert.deepEqual(affectionScores(quiz, answers)[0], ['time', 3]);
});

test('quiz progress survives a JSON storage round trip without changing another participant', () => {
  const entry = emptyQuizEntry();
  entry.answers.you.date = 'home';
  const restored = JSON.parse(JSON.stringify(entry));
  assert.deepEqual(restored, entry);
  assert.deepEqual(restored.answers.partner, {});
  assert.equal(restored.submitted.you, false);
});
