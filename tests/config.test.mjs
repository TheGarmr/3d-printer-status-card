import assert from 'node:assert/strict';
import test from 'node:test';

import { DEFAULT_SPOOLMAN, normalizeConfig } from '../src/config.ts';

test('normalizes an empty config to English and empty optional collections', () => {
  const config = normalizeConfig({ type: 'custom:printer-status-card' });

  assert.equal(config.type, 'custom:printer-status-card');
  assert.equal(config.name, '3D Printer');
  assert.equal(config.language, 'en');
  assert.equal(config.show_camera, true);
  assert.equal(config.camera_view, 'live');
  assert.deepEqual(config.entities, {});
  assert.equal(config.spoolman.set_active_spool_service, '');
  assert.equal(config.spoolman.get_active_spool_service, '');
  assert.deepEqual(config.macros, []);
});

test('deep-merges a partial Spoolman config without losing defaults', () => {
  const config = normalizeConfig({
    type: 'custom:printer-status-card',
    spoolman: { color_hex_entity_template: 'sensor.color_{id}' },
  });

  assert.equal(config.spoolman.color_hex_entity_template, 'sensor.color_{id}');
  assert.equal(config.spoolman.spool_entity_template, DEFAULT_SPOOLMAN.spool_entity_template);
  assert.equal(
    config.spoolman.filament_name_entity_template,
    DEFAULT_SPOOLMAN.filament_name_entity_template,
  );
  assert.equal(
    config.spoolman.filament_material_entity_template,
    'sensor.spoolman_spool_{id}_filament_material',
  );
  assert.equal(
    config.spoolman.vendor_name_entity_template,
    'sensor.spoolman_spool_{id}_vendor_name',
  );
});

test('preserves the configured active-spool services', () => {
  const config = normalizeConfig({
    type: 'custom:printer-status-card',
    spoolman: {
      set_active_spool_service: 'rest_command.set_spool_id',
      get_active_spool_service: 'rest_command.get_active_spool_id',
    },
  });

  assert.equal(config.spoolman.set_active_spool_service, 'rest_command.set_spool_id');
  assert.equal(config.spoolman.get_active_spool_service, 'rest_command.get_active_spool_id');
});

test('uses English for unsupported language values', () => {
  const config = normalizeConfig({
    type: 'custom:printer-status-card',
    language: 'auto',
  });

  assert.equal(config.language, 'en');
});

test('copies nested collections instead of retaining mutable input references', () => {
  const input = {
    type: 'custom:printer-status-card',
    entities: { status: 'sensor.printer_status' },
    macros: [{ name: 'Pause', entity: 'button.printer_pause' }],
  };
  const config = normalizeConfig(input);

  assert.notEqual(config.entities, input.entities);
  assert.notEqual(config.macros, input.macros);
  assert.deepEqual(config.entities, input.entities);
  assert.deepEqual(config.macros, input.macros);
});
