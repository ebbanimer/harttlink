const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');

const { loadTypeScript } = require('./helpers/loadTypeScript.cjs');

const { migrateProfile } = loadTypeScript(path.resolve(__dirname, '../src/utils/profile.ts'));
const { initialProfile } = loadTypeScript(path.resolve(__dirname, '../src/constants/sampleData.ts'));

test('keeps customized legacy profile details while migrating friend to partner', () => {
  const legacy = { you: 'Alex', friend: 'Sam', since: '2024-03-01', birthday: 'May 2', likes: 'Coffee', story: 'Our own story' };
  const { friend, ...rest } = legacy;
  assert.deepEqual(migrateProfile(legacy), { ...rest, partner: friend });
  assert.equal(legacy.friend, 'Sam');
});

test('prefers an existing partner field and is safe to run again', () => {
  const profile = { ...initialProfile, partner: 'Robin' };
  assert.deepEqual(migrateProfile({ ...profile, friend: 'Old name' }), profile);
  assert.deepEqual(migrateProfile(migrateProfile(profile)), profile);
});

test('uses sample defaults for invalid stored data', () => {
  for (const value of [null, 12, 'invalid', [], {}]) {
    assert.deepEqual(migrateProfile(value), initialProfile);
  }
});

test('ignores invalid field types without losing other valid edits', () => {
  assert.deepEqual(migrateProfile({ ...initialProfile, you: 'Alex', partner: 42 }), { ...initialProfile, you: 'Alex' });
});
