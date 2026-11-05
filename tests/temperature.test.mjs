import assert from 'node:assert/strict';
import test from 'node:test';

import { temperatureWithTargetText } from '../src/meter.ts';

const temp = (state) => ({ state, attributes: { unit_of_measurement: '°C' } });

test('shows the current temperature next to an active target', () => {
  assert.equal(temperatureWithTargetText(temp('60.23'), temp('60.0')), '60.2 / 60 °C');
  assert.equal(temperatureWithTargetText(temp('25'), temp('210')), '25 / 210 °C');
});

test('omits the target when the heater is off or the target is unknown', () => {
  assert.equal(temperatureWithTargetText(temp('24.8'), temp('0.0')), undefined);
  assert.equal(temperatureWithTargetText(temp('24.8'), temp('unavailable')), undefined);
  assert.equal(temperatureWithTargetText(temp('24.8'), undefined), undefined);
  assert.equal(temperatureWithTargetText(temp('unavailable'), temp('60')), undefined);
});

test('falls back to the target unit and to a unitless value', () => {
  assert.equal(temperatureWithTargetText({ state: '58' }, temp('60')), '58 / 60 °C');
  assert.equal(temperatureWithTargetText({ state: '58' }, { state: '60' }), '58 / 60');
});
