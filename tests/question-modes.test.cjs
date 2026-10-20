const assert=require('node:assert/strict');
const path=require('node:path');
const {test}=require('node:test');
const {loadTypeScript}=require('./helpers/loadTypeScript.cjs');
const {getExploreItems}=loadTypeScript(path.resolve(__dirname,'../src/utils/explore.ts'));
const {shuffleThemes,shuffleQuestions}=loadTypeScript(path.resolve(__dirname,'../src/constants/shuffleQuestions.ts'));
const {randomQuestionIndex}=loadTypeScript(path.resolve(__dirname,'../src/utils/randomQuestion.ts'));

test('themed IRL questions, answerable quizzes, and quick shuffle questions are distinct streams',()=>{
  const irl=getExploreItems('Questions');
  const quizzes=getExploreItems('Quizzes');
  const shuffle=getExploreItems('Shuffle questions');
  assert.ok(irl.length&&quizzes.length&&shuffle.length);
  assert.ok(irl.every(item=>!item.interaction&&!item.quizId&&item.body.length>0));
  assert.ok(quizzes.every(item=>item.quizId));
  assert.ok(shuffle.every(item=>item.interaction==='exchange'&&!item.quizId));
});
test('Funny, Random, and Cute each have a shuffle deck and valid nonrepeating choices',()=>{
  assert.deepEqual(shuffleThemes.map(theme=>theme.id),['funny','random','cute']);
  for(const theme of shuffleThemes) {
    const pool=shuffleQuestions[theme.id];
    assert.ok(pool.length>=5);
    assert.ok(getExploreItems('Shuffle questions',theme.id).length>0);
    for(let previous=0;previous<pool.length;previous++)for(const random of [0,.5,.99999]){
      const next=randomQuestionIndex(previous,()=>random,pool.length);
      assert.ok(next>=0&&next<pool.length);
      assert.notEqual(next,previous);
    }
  }
});
