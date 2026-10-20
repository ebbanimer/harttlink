const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { loadTypeScript } = require('./helpers/loadTypeScript.cjs');
const { randomQuestionIndex } = loadTypeScript(path.resolve(__dirname,'../src/utils/randomQuestion.ts'));
const { FUNNY_QUESTIONS } = loadTypeScript(path.resolve(__dirname,'../src/constants/sharing.ts'));
const { getDemoReply } = loadTypeScript(path.resolve(__dirname,'../src/services/assistant.ts'));
const { ASSISTANT_COPY } = loadTypeScript(path.resolve(__dirname,'../src/constants/assistant.ts'));
const { ClosebyProvider } = loadTypeScript(path.resolve(__dirname,'../src/state/ClosebyProvider.tsx'));
const { ChatSheet } = loadTypeScript(path.resolve(__dirname,'../src/components/ChatSheet.tsx'));

test('random questions never immediately repeat and always stay in range',()=>{
  for(let previous=0;previous<FUNNY_QUESTIONS.length;previous++) {
    for(const random of [0,0.25,0.5,0.999999]) {
      const next=randomQuestionIndex(previous,()=>random);
      assert.notEqual(next,previous);
      assert.ok(next>=0 && next<FUNNY_QUESTIONS.length);
    }
  }
});
test('demo companion responds by topic and remains an explicit offline demo',()=>{
  assert.equal(getDemoReply('Give me a date idea'),ASSISTANT_COPY.date);
  assert.equal(getDemoReply('Suggest a sweet gesture'),ASSISTANT_COPY.gesture);
  assert.equal(getDemoReply('Help me start a conversation'),ASSISTANT_COPY.conversation);
  assert.match(ASSISTANT_COPY.notice,/SCRIPTED/);
});
test('AI chat has companion identity and does not load old partner messages',()=>{
  global.localStorage={getItem:key=>key==='closeby-chat'?JSON.stringify([{who:'them',text:'Legacy partner conversation'}]):null};
  try {
    const html=renderToStaticMarkup(React.createElement(ClosebyProvider,null,React.createElement(ChatSheet)));
    assert.match(html,/Hartlink AI/);
    assert.match(html,/OFFLINE DEMO/);
    assert.doesNotMatch(html,/Legacy partner conversation/);
  } finally {delete global.localStorage;}
});
