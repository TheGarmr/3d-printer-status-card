import en from './languages/en.json' with { type: 'json' };
import ru from './languages/ru.json' with { type: 'json' };
import uk from './languages/uk.json' with { type: 'json' };

import type { Language } from '../types';

type Dictionary = Record<string, unknown>;

const dictionaries: Record<Language, Dictionary> = { en, ru, uk };

function lookup(dictionary: Dictionary, dottedKey: string): string | undefined {
  const result = dottedKey.split('.').reduce<unknown>((value, key) => {
    if (!value || typeof value !== 'object') return undefined;
    return (value as Record<string, unknown>)[key];
  }, dictionary);

  return typeof result === 'string' ? result : undefined;
}

export function localize(language: string | undefined, dottedKey: string): string {
  const selected = language === 'ru' || language === 'uk' || language === 'en'
    ? language
    : 'en';

  return lookup(dictionaries[selected], dottedKey)
    ?? lookup(dictionaries.en, dottedKey)
    ?? dottedKey;
}
