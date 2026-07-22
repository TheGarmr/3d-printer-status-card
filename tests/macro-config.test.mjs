import assert from 'node:assert/strict';
import test from 'node:test';

import {
  macroToEditorRow,
  parseJsonObject,
  rowsToMacros,
} from '../src/macro-config.ts';

test('converts a service macro to an editable row', () => {
  const row = macroToEditorRow({
    name: 'Home',
    service: 'rest_command.printer_gcode',
    service_data: { script: 'G28' },
    target: { entity_id: 'sensor.printer' },
  });

  assert.equal(row.kind, 'service');
  assert.equal(row.service, 'rest_command.printer_gcode');
  assert.deepEqual(JSON.parse(row.service_data_text), { script: 'G28' });
  assert.deepEqual(JSON.parse(row.target_text), { entity_id: 'sensor.printer' });
});

test('accepts only JSON objects', () => {
  assert.deepEqual(parseJsonObject('{"script":"G28"}'), { script: 'G28' });
  assert.deepEqual(parseJsonObject(''), {});
  assert.equal(parseJsonObject('[1,2]'), undefined);
  assert.equal(parseJsonObject('false'), undefined);
  assert.equal(parseJsonObject('{broken'), undefined);
});

test('converts valid editor rows and reports invalid JSON without partial output', () => {
  const valid = rowsToMacros([{
    name: 'Pause',
    kind: 'entity',
    entity: 'button.printer_pause',
    service: '',
    service_data_text: '{}',
    target_text: '{}',
  }, {
    name: 'Home',
    kind: 'service',
    entity: '',
    service: 'rest_command.printer_gcode',
    service_data_text: '{"script":"G28"}',
    target_text: '{}',
  }]);

  assert.deepEqual(valid.errors, {});
  assert.deepEqual(valid.macros, [
    { name: 'Pause', entity: 'button.printer_pause' },
    { name: 'Home', service: 'rest_command.printer_gcode', service_data: { script: 'G28' } },
  ]);

  const invalid = rowsToMacros([{
    name: 'Broken',
    kind: 'service',
    entity: '',
    service: 'rest_command.printer_gcode',
    service_data_text: '[1,2]',
    target_text: '{}',
  }]);
  assert.deepEqual(invalid.macros, []);
  assert.equal(invalid.errors['0.service_data_text'], true);
});
