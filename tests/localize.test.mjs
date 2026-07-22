import assert from 'node:assert/strict';
import test from 'node:test';

import { localize } from '../src/localize/localize.ts';

test('uses the requested manual language', () => {
  assert.equal(localize('ru', 'status.offline'), 'ОФФЛАЙН');
  assert.equal(localize('uk', 'status.poweredOff'), 'ВИМКНЕНО');
});

test('localizes known printer states in every supported language', () => {
  const expected = {
    en: ['PRINTING', 'COMPLETED', 'PAUSED', 'ERROR', 'IDLE'],
    ru: ['ПЕЧАТЬ', 'ЗАВЕРШЕНО', 'ПАУЗА', 'ОШИБКА', 'ОЖИДАНИЕ'],
    uk: ['ДРУК', 'ЗАВЕРШЕНО', 'ПАУЗА', 'ПОМИЛКА', 'ОЧІКУВАННЯ'],
  };
  const keys = ['printing', 'completed', 'paused', 'error', 'idle'];

  for (const [language, values] of Object.entries(expected)) {
    assert.deepEqual(keys.map((key) => localize(language, `status.${key}`)), values);
  }
});

test('uses the requested print and filament terminology', () => {
  assert.equal(localize('en', 'card.elapsedTime'), 'Print duration');
  assert.equal(localize('ru', 'card.elapsedTime'), 'Длительность печати');
  assert.equal(localize('ru', 'card.spoolman'), 'Текущий филамент');
  assert.equal(localize('ru', 'card.filamentUsed'), 'Использовано филамента');
  assert.equal(localize('ru', 'card.powerNow'), 'Потребление');
  assert.equal(localize('uk', 'card.elapsedTime'), 'Тривалість друку');
  assert.equal(localize('uk', 'card.spoolman'), 'Поточний філамент');
  assert.equal(localize('uk', 'card.filamentUsed'), 'Використано філаменту');
  assert.equal(localize('uk', 'card.powerNow'), 'Споживання');
});

test('localizes the active spool service editor field', () => {
  assert.equal(localize('en', 'fields.setActiveSpoolService'), 'Set active spool service');
  assert.equal(localize('ru', 'fields.setActiveSpoolService'), 'Сервис выбора активной катушки');
  assert.equal(localize('uk', 'fields.setActiveSpoolService'), 'Сервіс вибору активної котушки');
});

test('localizes filament indicator tooltips', () => {
  const expected = {
    en: ['Filament present', 'Filament missing'],
    ru: ['Филамент есть', 'Филамент отсутствует'],
    uk: ['Філамент є', 'Філамент відсутній'],
  };

  for (const [language, values] of Object.entries(expected)) {
    assert.deepEqual(
      ['filamentPresent', 'filamentMissing'].map((key) => localize(language, `card.${key}`)),
      values,
    );
  }
});

test('uses English when the configured language is unsupported', () => {
  assert.equal(localize('de', 'status.offline'), 'OFFLINE');
});

test('returns the English fallback when a translation is absent', () => {
  assert.equal(localize('ru', 'fallback.englishOnly'), 'English fallback');
});

test('returns the dotted key when no dictionary defines it', () => {
  assert.equal(localize('en', 'missing.path'), 'missing.path');
});
