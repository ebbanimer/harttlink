const assert=require('node:assert/strict');
const path=require('node:path');
const {test}=require('node:test');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const {loadTypeScript}=require('./helpers/loadTypeScript.cjs');
const {monthDay,annualDate,buildImportantDates,upcomingImportantDates,importantDateOnDay,sortedMemories}=loadTypeScript(path.resolve(__dirname,'../src/utils/ourSpace.ts'));
const {initialProfile}=loadTypeScript(path.resolve(__dirname,'../src/constants/sampleData.ts'));
const {RelationshipScreen}=loadTypeScript(path.resolve(__dirname,'../src/screens/RelationshipScreen.tsx'));
const {ClosebyProvider}=loadTypeScript(path.resolve(__dirname,'../src/state/ClosebyProvider.tsx'));

test('legacy birthday text and ISO dates produce valid recurring month/day values',()=>{
  assert.equal(monthDay('April 18'),'04-18');
  assert.equal(monthDay('04-18'),'04-18');
  assert.equal(monthDay('1995-04-18'),'04-18');
  for(const value of ['April 31','02-30','13-01','nonsense'])assert.equal(monthDay(value),null);
});
test('birthdays and anniversaries roll over to next year without losing saved dates',()=>{
  const events=buildImportantDates(initialProfile,[]);
  const result=upcomingImportantDates(events,'2026-12-31',{});
  assert.equal(result.find(event=>event.id==='partner-birthday').nextDate,'2027-04-18');
  assert.equal(result.find(event=>event.id==='anniversary').nextDate,'2027-06-12');
  assert.equal(events.find(event=>event.id==='anniversary').date,initialProfile.since);
});
test('week-before and same-day reminders respect disabled preferences',()=>{
  const event={id:'birthday',title:'Birthday',date:'2000-10-27',annual:true};
  assert.equal(upcomingImportantDates([event],'2026-10-20',{})[0].reminderDue,true);
  assert.equal(upcomingImportantDates([event],'2026-10-27',{})[0].reminderDue,true);
  assert.equal(upcomingImportantDates([event],'2026-10-20',{birthday:[0]})[0].reminderDue,false);
  assert.equal(upcomingImportantDates([event],'2026-10-27',{birthday:[]})[0].reminderDue,false);
});
test('February 29 recurs on February 28 in non-leap years, including the calendar marker',()=>{
  assert.equal(annualDate('2000-02-29',2027),'2027-02-28');
  assert.equal(annualDate('2000-02-29',2028),'2028-02-29');
  assert.equal(importantDateOnDay({id:'leap',title:'Birthday',date:'2000-02-29',annual:true},'2027-02-28'),true);
});
test('one-off dates do not repeat and timeline sorting preserves legacy memory content',()=>{
  assert.equal(upcomingImportantDates([{id:'once',title:'A trip',date:'2026-01-01',annual:false}],'2026-10-20',{}).length,0);
  const memories=[{title:'Older',date:'August 2026',note:'Kept',emoji:'🌊',photo:''},{title:'New milestone',date:'October 2026',occurredOn:'2026-10-20',kind:'milestone',note:'New',emoji:'✨',photo:''}];
  const sorted=sortedMemories(memories);
  assert.equal(sorted[0].title,'New milestone');
  assert.equal(sorted[1].note,'Kept');
  assert.equal(memories[0].title,'Older');
});
test('Our Space displays reminders, persisted partner favorites, and timeline milestones',()=>{
  const values={'hartlink-partner-favorites':{treats:'Lemon cake',timeTogether:'Bookshop walks',giftIdeas:'A pottery workshop',notes:'Likes handwritten notes'},'closeby-memories':[{title:'Our first home',date:'October 2026',occurredOn:'2026-10-01',kind:'milestone',note:'A new chapter',emoji:'🏡',photo:''}]};
  global.localStorage={getItem:key=>key in values?JSON.stringify(values[key]):null};
  try{
    const html=renderToStaticMarkup(React.createElement(ClosebyProvider,null,React.createElement(RelationshipScreen)));
    for(const text of ['Our anniversary','Sophie’s birthday','A week before','On the day','Lemon cake','Our timeline','Our first home','Milestone'])assert.ok(html.includes(text),text);
    assert.match(html,/Phone notifications are not connected/);
  }finally{delete global.localStorage;}
});
