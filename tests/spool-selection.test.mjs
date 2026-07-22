import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildSpoolServiceData,
  discoverSpoolOptions,
  isActiveSpoolOption,
  parseServiceReference,
} from '../src/spool-selection.ts';

const states = {
  'sensor.spoolman_spool_12': { state: '410', attributes: { filament_name: 'PETG Black' } },
  'sensor.spoolman_spool_12_filament_name': { state: 'PETG Black' },
  'sensor.spoolman_spool_7': { state: '842', attributes: {} },
  'sensor.spoolman_spool_7_filament_name': { state: 'PLA Galaxy' },
  'sensor.spoolman_spool_18': { state: '500', attributes: { archived: true } },
  'sensor.spoolman_spool_20': { state: 'unavailable', attributes: {} },
  'sensor.unrelated': { state: '1' },
};

test('discovers available non-archived spools and sorts numeric IDs', () => {
  assert.deepEqual(discoverSpoolOptions(
    states,
    'sensor.spoolman_spool_{id}',
    'sensor.spoolman_spool_{id}_filament_name',
  ), [
    { id: '7', label: 'ID 7 · PLA Galaxy' },
    { id: '12', label: 'ID 12 · PETG Black' },
  ]);
});

test('uses main-entity attributes and a stable fallback name', () => {
  const input = {
    'sensor.spoolman_spool_3': { state: '300', attributes: { material: 'ABS Gray' } },
    'sensor.spoolman_spool_4': { state: '300', attributes: {} },
  };
  assert.deepEqual(discoverSpoolOptions(
    input,
    'sensor.spoolman_spool_{id}',
    'sensor.spoolman_spool_{id}_filament_name',
  ), [
    { id: '3', label: 'ID 3 · ABS Gray' },
    { id: '4', label: 'ID 4 · Spool 4' },
  ]);
});

test('rejects templates without an id token', () => {
  assert.deepEqual(discoverSpoolOptions(
    states,
    'sensor.spoolman_spool',
    'sensor.name_{id}',
  ), []);
});

test('parses a valid service and builds numeric service data', () => {
  assert.deepEqual(parseServiceReference('rest_command.set_spool_id'), {
    domain: 'rest_command',
    service: 'set_spool_id',
  });
  assert.equal(parseServiceReference('invalid'), undefined);
  assert.deepEqual(buildSpoolServiceData('12'), {
    spool_id: 12,
    useragent: '3D-printer-status-card',
  });
  assert.equal(buildSpoolServiceData('abc'), undefined);
});

test('selects only the option matching the active spool ID', () => {
  assert.equal(isActiveSpoolOption('19', '19'), true);
  assert.equal(isActiveSpoolOption('2', '19'), false);
  assert.equal(isActiveSpoolOption('19', undefined), false);
});
