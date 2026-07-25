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
  assert.equal(localize('en', 'card.spoolman'), 'Filament');
  assert.equal(localize('ru', 'card.elapsedTime'), 'Длительность печати');
  assert.equal(localize('ru', 'card.spoolman'), 'Филамент');
  assert.equal(localize('ru', 'card.filamentUsed'), 'Использовано');
  assert.equal(localize('ru', 'card.powerNow'), 'Потребление');
  assert.equal(localize('uk', 'card.elapsedTime'), 'Тривалість друку');
  assert.equal(localize('uk', 'card.spoolman'), 'Філамент');
  assert.equal(localize('uk', 'card.filamentUsed'), 'Використано');
  assert.equal(localize('uk', 'card.powerNow'), 'Споживання');
});

test('localizes the active spool service editor field', () => {
  assert.equal(localize('en', 'fields.setActiveSpoolService'), 'Set active spool service');
  assert.equal(localize('en', 'fields.getActiveSpoolService'), 'Verify active spool service');
  assert.equal(localize('ru', 'fields.setActiveSpoolService'), 'Сервис выбора активной катушки');
  assert.equal(localize('ru', 'fields.getActiveSpoolService'), 'Сервис проверки активной катушки');
  assert.equal(localize('uk', 'fields.setActiveSpoolService'), 'Сервіс вибору активної котушки');
  assert.equal(localize('uk', 'fields.getActiveSpoolService'), 'Сервіс перевірки активної котушки');
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

test('localizes the printer section and revised spool labels', () => {
  assert.equal(localize('en', 'card.filamentUsed'), 'Used');
  assert.equal(localize('en', 'card.spoolSelection'), 'Choose spool');
  assert.equal(localize('en', 'card.printer'), 'Printer');
  assert.equal(localize('ru', 'card.filamentUsed'), 'Использовано');
  assert.equal(localize('ru', 'card.spoolSelection'), 'Выбрать катушку');
  assert.equal(localize('ru', 'card.printer'), 'Принтер');
  assert.equal(localize('uk', 'card.filamentUsed'), 'Використано');
  assert.equal(localize('uk', 'card.spoolSelection'), 'Вибрати котушку');
  assert.equal(localize('uk', 'card.printer'), 'Принтер');
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
