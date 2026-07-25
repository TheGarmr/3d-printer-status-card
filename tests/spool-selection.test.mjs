import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildSpoolServiceData,
  discoverSpoolOptions,
  extractConfirmedSpoolId,
  isActiveSpoolOption,
  parseServiceReference,
  resolveSpoolSelectionValue,
} from '../src/spool-selection.ts';

const states = {
  'sensor.spoolman_spool_12': {
    state: '410',
    attributes: {
      filament_name: 'PETG Black',
      filament_material: 'PETG',
      filament_vendor_name: 'Prusament',
    },
  },
  'sensor.spoolman_spool_12_id': {
    state: { translated: '12', raw: '12' },
    attributes: { friendly_name: 'Prusament PETG Black ID' },
  },
  'sensor.spoolman_spool_12_filament_name': { state: 'PETG Black' },
  'sensor.spoolman_spool_7': { state: '842', attributes: {} },
  'sensor.spoolman_spool_7_id': { state: '7', attributes: {} },
  'sensor.spoolman_spool_7_filament_name': { state: 'Galaxy' },
  'sensor.spoolman_spool_7_filament_material': { state: 'PLA' },
  'sensor.spoolman_spool_7_vendor_name': { state: 'Polymaker' },
  'sensor.spoolman_spool_18': { state: '500', attributes: { archived: true } },
  'sensor.spoolman_spool_18_id': { state: '18', attributes: {} },
  'sensor.spoolman_spool_20': { state: 'unavailable', attributes: {} },
  'sensor.spoolman_spool_20_id': { state: 'unavailable', attributes: {} },
  'sensor.unrelated': { state: '1' },
};

test('discovers ID entities, reads raw IDs, and sorts numeric IDs', () => {
  assert.deepEqual(discoverSpoolOptions(
    states,
    'sensor.spoolman_spool_{id}',
    'sensor.spoolman_spool_{id}_id',
    'sensor.spoolman_spool_{id}_filament_name',
    'sensor.spoolman_spool_{id}_filament_material',
    'sensor.spoolman_spool_{id}_vendor_name',
  ), [
    { id: '7', label: 'Galaxy · PLA · Polymaker · 7' },
    { id: '12', label: 'PETG Black · PETG · Prusament · 12' },
  ]);
});

test('uses main-entity attributes and a stable fallback name', () => {
  const input = {
    'sensor.spoolman_spool_3': { state: '300', attributes: { material: 'ABS Gray' } },
    'sensor.spoolman_spool_3_id': { state: '3', attributes: {} },
    'sensor.spoolman_spool_4': { state: '300', attributes: {} },
    'sensor.spoolman_spool_4_id': { state: '4', attributes: {} },
  };
  assert.deepEqual(discoverSpoolOptions(
    input,
    'sensor.spoolman_spool_{id}',
    'sensor.spoolman_spool_{id}_id',
    'sensor.spoolman_spool_{id}_filament_name',
    'sensor.spoolman_spool_{id}_filament_material',
    'sensor.spoolman_spool_{id}_vendor_name',
  ), [
    { id: '3', label: 'ABS Gray · 3' },
    { id: '4', label: '4' },
  ]);
});

test('does not require a main spool entity when an ID entity is available', () => {
  const input = {
    'sensor.spoolman_spool_5_id': { state: '5', attributes: {} },
    'sensor.spoolman_spool_5_filament_name': { state: 'Wood' },
    'sensor.spoolman_spool_5_filament_material': { state: 'PLA' },
    'sensor.spoolman_spool_5_vendor_name': { state: 'Creality' },
  };

  assert.deepEqual(discoverSpoolOptions(
    input,
    'sensor.spoolman_spool_{id}',
    'sensor.spoolman_spool_{id}_id',
    'sensor.spoolman_spool_{id}_filament_name',
    'sensor.spoolman_spool_{id}_filament_material',
    'sensor.spoolman_spool_{id}_vendor_name',
  ), [
    { id: '5', label: 'Wood · PLA · Creality · 5' },
  ]);
});

test('rejects ID entity templates without an id token', () => {
  assert.deepEqual(discoverSpoolOptions(
    states,
    'sensor.spoolman_spool_{id}',
    'sensor.spoolman_spool_id',
    'sensor.name_{id}',
    'sensor.material_{id}',
    'sensor.vendor_{id}',
  ), []);
});

test('truncates long option labels while preserving the numeric ID suffix', () => {
  const input = {
    'sensor.spoolman_spool_42': {
      state: '300',
      attributes: {
        filament_name: 'An exceptionally long decorative filament name',
        filament_material: 'PLA',
        filament_vendor_name: 'Very Long Manufacturer',
      },
    },
    'sensor.spoolman_spool_42_id': { state: '42', attributes: {} },
  };

  const [option] = discoverSpoolOptions(
    input,
    'sensor.spoolman_spool_{id}',
    'sensor.spoolman_spool_{id}_id',
    'sensor.spoolman_spool_{id}_filament_name',
    'sensor.spoolman_spool_{id}_filament_material',
    'sensor.spoolman_spool_{id}_vendor_name',
  );

  assert.equal(option.label.length, 42);
  assert.equal(option.label.startsWith('An exceptionally'), true);
  assert.equal(option.label.endsWith('… · 42'), true);
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

test('keeps a pending spool selection until the active entity catches up', () => {
  assert.equal(resolveSpoolSelectionValue('19', undefined), '19');
  assert.equal(resolveSpoolSelectionValue('19', '2'), '2');
  assert.equal(resolveSpoolSelectionValue(undefined, undefined), '');
});

test('extracts a confirmed spool ID from a REST command response', () => {
  assert.equal(extractConfirmedSpoolId({
    context: {},
    response: {
      status: 200,
      content: { spool_id: 18 },
      headers: { 'content-type': 'application/json' },
    },
  }), '18');

  assert.equal(extractConfirmedSpoolId({
    response: {
      status: 200,
      content: '{"spool_id": "7"}',
    },
  }), '7');
});

test('rejects failed or malformed active-spool responses', () => {
  assert.equal(extractConfirmedSpoolId({
    response: { status: 500, content: { spool_id: 18 } },
  }), undefined);
  assert.equal(extractConfirmedSpoolId({
    response: { status: 200, content: { spool_id: 'not-a-number' } },
  }), undefined);
  assert.equal(extractConfirmedSpoolId(undefined), undefined);
});
