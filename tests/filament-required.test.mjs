import assert from 'node:assert/strict';
import test from 'node:test';

import {
  extractFileMetadata,
  formatGrams,
  remainingFilamentGrams,
  requiredFilamentGrams,
} from '../src/filament-required.ts';

const envelope = (content, status = 200) => ({
  context: {},
  response: { status, content, headers: { 'content-type': 'application/json' } },
});

test('extracts Moonraker metadata from a REST command response', () => {
  const metadata = { filename: 'cube.gcode', filament_weight_total: 42.37 };
  assert.deepEqual(extractFileMetadata(envelope({ result: metadata })), metadata);
  assert.deepEqual(
    extractFileMetadata(envelope(JSON.stringify({ result: metadata }))),
    metadata,
  );
});

test('rejects failed or malformed metadata responses', () => {
  assert.equal(extractFileMetadata(envelope({ result: {} }, 404)), undefined);
  assert.equal(extractFileMetadata(envelope('not json')), undefined);
  assert.equal(extractFileMetadata(undefined), undefined);
});

test('prefers the slicer weight estimate', () => {
  assert.equal(requiredFilamentGrams({ filament_weight_total: 42.37, filament_total: 1 }), 42.4);
});

test('derives grams from length, density and diameter when the weight is missing', () => {
  assert.equal(requiredFilamentGrams({ filament_total: 10000 }), 29.8);
  assert.equal(requiredFilamentGrams({ filament_total: 10000 }, 1.27, 1.75), 30.5);
  assert.equal(requiredFilamentGrams({ filament_total: 10000, filament_weight_total: 0 }, 'x', null), 29.8);
});

test('returns nothing without a usable estimate', () => {
  assert.equal(requiredFilamentGrams({}), undefined);
  assert.equal(requiredFilamentGrams({ filament_weight_total: '' }), undefined);
  assert.equal(requiredFilamentGrams(undefined), undefined);
});

test('scales the remaining filament by print progress', () => {
  assert.equal(remainingFilamentGrams(40, 25), 30);
  assert.equal(remainingFilamentGrams(40, 120), 0);
  assert.equal(remainingFilamentGrams(40, undefined), 40);
});

test('formats grams compactly', () => {
  assert.equal(formatGrams(42.37), '42.4 g');
  assert.equal(formatGrams(312.6), '313 g');
});
