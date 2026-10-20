const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');
const { loadTypeScript } = require('./helpers/loadTypeScript.cjs');
const { exploreTopics } = loadTypeScript(path.resolve(__dirname,'../src/constants/explore.ts'));
const { items, categories } = loadTypeScript(path.resolve(__dirname,'../src/constants/content.ts'));
const { getExploreItems } = loadTypeScript(path.resolve(__dirname,'../src/utils/explore.ts'));

test('Date ideas replaces Activities and all browse categories have matching content',()=>{
  assert.ok(categories.includes('Date ideas'));
  assert.ok(!categories.includes('Activities'));
  for(const [category,topics] of Object.entries(exploreTopics)) {
    for(const topic of topics) {
      const results=getExploreItems(category,topic.id);
      assert.ok(results.length>0,topic.title+' should not be empty');
      assert.ok(results.every(item=>item.category===category && item.topics.includes(topic.id)));
    }
  }
});
test('all date and question cards have valid topic IDs and stable unique item IDs',()=>{
  assert.equal(new Set(items.map(item=>item.id)).size,items.length);
  for(const item of items.filter(item=>exploreTopics[item.category])) {
    assert.ok(item.topics?.length);
    assert.ok(item.topics.every(id=>exploreTopics[item.category].some(topic=>topic.id===id)));
  }
  for(const id of ['walk','cozy','first-date','deep','memories']) assert.ok(items.some(item=>item.id===id));
});
test('At home excludes outdoor-only dates and all-category browsing restores every date',()=>{
  const atHome=getExploreItems('Date ideas','at-home');
  assert.ok(atHome.some(item=>item.id==='cozy'));
  assert.ok(!atHome.some(item=>item.id==='walk'));
  assert.equal(getExploreItems('Date ideas','all').length,items.filter(item=>item.category==='Date ideas').length);
});
test('Would you rather conversation packs stay separate from answerable quizzes',()=>{
  const questions=getExploreItems('Questions','would-you-rather');
  assert.ok(questions.length>0);
  assert.ok(questions.every(item=>item.body.length>0 && !item.quizId));
  assert.ok(getExploreItems('Quizzes').some(item=>item.quizId==='rather'));
});
