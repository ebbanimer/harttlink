const assert=require('node:assert/strict');
const path=require('node:path');
const {test}=require('node:test');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const {loadTypeScript}=require('./helpers/loadTypeScript.cjs');
const {saveQuestionAnswer,questionNeedsReply,latestQuestionAnswer}=loadTypeScript(path.resolve(__dirname,'../src/utils/exchanges.ts'));
const {QuestionInbox}=loadTypeScript(path.resolve(__dirname,'../src/components/QuestionInbox.tsx'));
const {FunnyQuestion}=loadTypeScript(path.resolve(__dirname,'../src/components/FunnyQuestion.tsx'));
const {ClosebyProvider}=loadTypeScript(path.resolve(__dirname,'../src/state/ClosebyProvider.tsx'));
const question={id:'q1',sender:'you',question:'What would our sitcom be called?',createdAt:'2026-10-20T12:00:00Z',replies:[]};

test('each person can answer the question directly, including the person who picked it',()=>{
  assert.equal(questionNeedsReply(question,'you'),true);
  assert.equal(questionNeedsReply(question,'partner'),true);
  const answered=saveQuestionAnswer(question,'you','A lovely mess','a1','now');
  assert.equal(questionNeedsReply(answered,'you'),false);
  assert.equal(questionNeedsReply(answered,'partner'),true);
});
test('editing replaces your answer rather than adding a conversation message',()=>{
  const first=saveQuestionAnswer(question,'partner','Two snacks and a sofa','a1','now');
  const second=saveQuestionAnswer(first,'you','A lovely mess','a2','now');
  const edited=saveQuestionAnswer(second,'partner','The snack club','a3','later');
  assert.equal(edited.replies.length,2);
  assert.equal(latestQuestionAnswer(edited,'partner').text,'The snack club');
  assert.equal(latestQuestionAnswer(edited,'you').text,'A lovely mess');
  assert.equal(question.replies.length,0);
  assert.deepEqual(JSON.parse(JSON.stringify(edited)),edited);
});
test('empty answers cannot be saved',()=>{
  assert.equal(saveQuestionAnswer(question,'partner','   ','a1','now'),question);
});
test('Home shows the saved question, answer field and partner slot directly on the card',()=>{
  global.localStorage={getItem:key=>key==='hartlink-question-exchanges-v1'?JSON.stringify([question]):null};
  try {
    const html=renderToStaticMarkup(React.createElement(ClosebyProvider,null,React.createElement(FunnyQuestion)));
    assert.match(html,/What would our sitcom be called/);
    assert.match(html,/<textarea/);
    assert.match(html,/Save my answer/);
    assert.match(html,/Waiting for.*Sophie/);
    assert.doesNotMatch(html,/class="bubble|Send reply|question inbox/);
  }finally{delete global.localStorage;}
});
test('saved question collection shows question cards instead of message threads',()=>{
  const answered=saveQuestionAnswer(question,'partner','The snack club','a1','now');
  global.localStorage={getItem:key=>key==='hartlink-question-exchanges-v1'?JSON.stringify([answered]):null};
  try {
    const html=renderToStaticMarkup(React.createElement(ClosebyProvider,null,React.createElement(QuestionInbox)));
    assert.match(html,/The snack club/);assert.match(html,/Our questions/);
    assert.doesNotMatch(html,/class="bubble|Send reply/);
  }finally{delete global.localStorage;}
});
