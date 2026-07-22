import assert from 'node:assert/strict';
import test from 'node:test';

import { filamentIndicatorState } from '../src/filament-indicator.ts';

test('classifies configured filament sensor states', () => {
  assert.equal(filamentIndicatorState('on', 'on', 'off'), 'present');
  assert.equal(filamentIndicatorState('off', 'on', 'off'), 'missing');
});

test('normalizes sensor and configured states', () => {
  assert.equal(filamentIndicatorState('  PRESENT ', 'present', 'absent'), 'present');
  assert.equal(filamentIndicatorState(' AbSeNt ', 'present', ' absent '), 'missing');
});

test('does not classify an unknown sensor state', () => {
  assert.equal(filamentIndicatorState('unknown', 'on', 'off'), undefined);
  assert.equal(filamentIndicatorState('', 'on', 'off'), undefined);
});
