import assert from 'node:assert/strict';
import test from 'node:test';

import { printerStatusDisplay } from '../src/status-display.ts';

test('maps known printer states to a CSS class and translation key', () => {
  assert.deepEqual(printerStatusDisplay('printing'), {
    cssClass: 'printing',
    translationKey: 'status.printing',
  });
  assert.deepEqual(printerStatusDisplay('BUSY'), {
    cssClass: 'printing',
    translationKey: 'status.printing',
  });
  assert.deepEqual(printerStatusDisplay('finished'), {
    cssClass: 'complete',
    translationKey: 'status.completed',
  });
  assert.deepEqual(printerStatusDisplay('pause'), {
    cssClass: 'paused',
    translationKey: 'status.paused',
  });
  assert.deepEqual(printerStatusDisplay('shutdown'), {
    cssClass: 'error',
    translationKey: 'status.error',
  });
  assert.deepEqual(printerStatusDisplay('idle'), {
    cssClass: 'idle',
    translationKey: 'status.idle',
  });
});

test('preserves unknown integration-specific status text', () => {
  assert.deepEqual(printerStatusDisplay('calibrating'), {
    cssClass: 'idle',
  });
});
