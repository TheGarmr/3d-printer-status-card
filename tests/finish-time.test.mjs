import assert from 'node:assert/strict';
import test from 'node:test';

import { finishTimeText } from '../src/finish-time.ts';

function entity(state, unit) {
  return {
    state: String(state),
    attributes: unit ? { unit_of_measurement: unit } : {},
  };
}

test('formats a same-day HH:MM:SS duration as time only', () => {
  const now = new Date(2026, 6, 22, 18, 0, 0);
  assert.equal(finishTimeText(entity('01:15:00'), 'en', now), '19:15');
});

test('formats tomorrow in each manually selected language', () => {
  const now = new Date(2026, 6, 22, 23, 30, 0);
  const remaining = entity('00:56:00');

  assert.equal(finishTimeText(remaining, 'en', now), 'Tomorrow, at 00:26');
  assert.equal(finishTimeText(remaining, 'ru', now), 'Завтра, в 00:26');
  assert.equal(finishTimeText(remaining, 'uk', now), 'Завтра, о 00:26');
});

test('formats a completion after tomorrow with a localized date and time', () => {
  const now = new Date(2026, 6, 22, 18, 0, 0);
  const remaining = entity('49:15:00');

  assert.equal(finishTimeText(remaining, 'en', now), '24 July, 19:15');
  assert.equal(finishTimeText(remaining, 'ru', now), '24 июля, 19:15');
  assert.equal(finishTimeText(remaining, 'uk', now), '24 липня, 19:15');
});

test('accepts numeric seconds, minutes, and hours', () => {
  const now = new Date(2026, 6, 22, 18, 0, 0);

  assert.equal(finishTimeText(entity('4500', 's'), 'en', now), '19:15');
  assert.equal(finishTimeText(entity('75', 'min'), 'en', now), '19:15');
  assert.equal(finishTimeText(entity('1.25', 'h'), 'en', now), '19:15');
});

test('accepts an MM:SS duration', () => {
  const now = new Date(2026, 6, 22, 18, 0, 0);
  assert.equal(finishTimeText(entity('10:30'), 'en', now), '18:10');
});

test('hides invalid, zero, negative, and missing durations', () => {
  const now = new Date(2026, 6, 22, 18, 0, 0);

  assert.equal(finishTimeText(entity('not-a-duration'), 'en', now), undefined);
  assert.equal(finishTimeText(entity('0', 's'), 'en', now), undefined);
  assert.equal(finishTimeText(entity('-5', 'min'), 'en', now), undefined);
  assert.equal(finishTimeText(undefined, 'en', now), undefined);
});
