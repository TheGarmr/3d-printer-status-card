import assert from 'node:assert/strict';
import test from 'node:test';

import { normalizeConfig } from '../src/config.ts';
import { resolveCardMode } from '../src/power-state.ts';

const cases = [
  {
    name: 'expands when all optional checks are omitted',
    entities: {},
    states: {},
    expected: 'expanded',
  },
  {
    name: 'expands when an online switch is the only configured check',
    entities: { power_switch: 'switch.plug' },
    states: { 'switch.plug': { state: 'on' } },
    expected: 'expanded',
  },
  {
    name: 'collapses as powered off when the switch is off',
    entities: { power_switch: 'switch.plug' },
    states: { 'switch.plug': { state: 'off' } },
    expected: 'powered_off',
  },
  {
    name: 'switch off takes precedence over unavailable downstream checks',
    entities: {
      power_switch: 'switch.plug',
      power_now: 'sensor.plug_power',
      status: 'sensor.printer_status',
    },
    states: {
      'switch.plug': { state: 'off' },
      'sensor.plug_power': { state: 'unavailable' },
      'sensor.printer_status': { state: 'unavailable' },
    },
    expected: 'powered_off',
  },
  {
    name: 'reports offline when a configured switch entity is missing',
    entities: { power_switch: 'switch.plug' },
    states: {},
    expected: 'offline',
  },
  {
    name: 'reports offline when the switch is unavailable',
    entities: { power_switch: 'switch.plug' },
    states: { 'switch.plug': { state: 'unavailable' } },
    expected: 'offline',
  },
  {
    name: 'reports offline when the switch uses a literal offline state',
    entities: { power_switch: 'switch.plug' },
    states: { 'switch.plug': { state: 'offline' } },
    expected: 'offline',
  },
  {
    name: 'collapses as powered off at zero consumption',
    entities: { power_now: 'sensor.plug_power' },
    states: { 'sensor.plug_power': { state: '0' } },
    expected: 'powered_off',
  },
  {
    name: 'collapses as powered off at negative consumption',
    entities: { power_now: 'sensor.plug_power' },
    states: { 'sensor.plug_power': { state: '-0.1' } },
    expected: 'powered_off',
  },
  {
    name: 'positive decimal consumption passes its check',
    entities: { power_now: 'sensor.plug_power' },
    states: { 'sensor.plug_power': { state: ' 12.5 ' } },
    expected: 'expanded',
  },
  {
    name: 'reports offline for non-numeric consumption',
    entities: { power_now: 'sensor.plug_power' },
    states: { 'sensor.plug_power': { state: 'not-a-number' } },
    expected: 'offline',
  },
  {
    name: 'reports offline for unavailable consumption',
    entities: { power_now: 'sensor.plug_power' },
    states: { 'sensor.plug_power': { state: 'unknown' } },
    expected: 'offline',
  },
  {
    name: 'zero consumption takes precedence over an offline printer',
    entities: { power_now: 'sensor.plug_power', status: 'sensor.printer_status' },
    states: {
      'sensor.plug_power': { state: '0' },
      'sensor.printer_status': { state: 'unavailable' },
    },
    expected: 'powered_off',
  },
  {
    name: 'reports offline when the configured printer status is missing',
    entities: { status: 'sensor.printer_status' },
    states: {},
    expected: 'offline',
  },
  {
    name: 'reports offline when the configured printer is unavailable without a plug',
    entities: { status: 'sensor.printer_status' },
    states: { 'sensor.printer_status': { state: 'unavailable' } },
    expected: 'offline',
  },
  {
    name: 'reports offline when the printer status is literal offline',
    entities: { status: 'sensor.printer_status' },
    states: { 'sensor.printer_status': { state: 'offline' } },
    expected: 'offline',
  },
  {
    name: 'expands when switch, consumption, and printer status all pass',
    entities: {
      power_switch: 'switch.plug',
      power_now: 'sensor.plug_power',
      status: 'sensor.printer_status',
    },
    states: {
      'switch.plug': { state: 'on' },
      'sensor.plug_power': { state: '245.8' },
      'sensor.printer_status': { state: 'printing' },
    },
    expected: 'expanded',
  },
];

for (const { name, entities, states, expected } of cases) {
  test(name, () => {
    const config = normalizeConfig({ type: 'custom:printer-status-card', entities });
    assert.equal(resolveCardMode(config, states), expected);
  });
}
