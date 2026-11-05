import assert from 'node:assert/strict';
import test from 'node:test';

import {
  formatPercent,
  layerText,
  meterLevel,
  numericState,
  percentState,
} from '../src/meter.ts';

const pct = (state) => ({ state, attributes: { unit_of_measurement: '%' } });

test('reads numeric states and rejects non-numeric ones', () => {
  assert.equal(numericState({ state: '1.6' }), 1.6);
  assert.equal(numericState({ state: 'unavailable' }), undefined);
  assert.equal(numericState({ state: '' }), undefined);
  assert.equal(numericState(undefined), undefined);
});

test('treats only percentage entities as meter values and clamps them', () => {
  assert.equal(percentState(pct('40.3825189740188')), 40.3825189740188);
  assert.equal(percentState(pct('104')), 100);
  assert.equal(percentState(pct('-3')), 0);
  assert.equal(percentState({ state: '1.6', attributes: {} }), undefined);
  assert.equal(percentState(pct('unknown')), undefined);
});

test('floors percentages so an unfinished print never shows 100%', () => {
  assert.equal(formatPercent(99.97), '99%');
  assert.equal(formatPercent(100), '100%');
  assert.equal(formatPercent(0.0002), '0%');
});

test('maps usage to warning and critical levels', () => {
  assert.equal(meterLevel(44), 'normal');
  assert.equal(meterLevel(75), 'warning');
  assert.equal(meterLevel(90), 'critical');
});

test('formats the current layer with and without a known total', () => {
  assert.equal(layerText({ state: '45' }, { state: '169' }), '45 / 169');
  assert.equal(layerText({ state: '45' }, { state: '0.0' }), '45');
  assert.equal(layerText({ state: '45' }, undefined), '45');
  assert.equal(layerText({ state: 'unavailable' }, { state: '169' }), undefined);
});
