import type { EntityStateLike, Language } from './types';

const LOCALES: Record<Language, string> = {
  en: 'en-GB',
  ru: 'ru-RU',
  uk: 'uk-UA',
};

const TOMORROW_AT: Record<Language, string> = {
  en: 'Tomorrow, at {time}',
  ru: 'Завтра, в {time}',
  uk: 'Завтра, о {time}',
};

const UNIT_MULTIPLIERS: Record<string, number> = {
  s: 1,
  sec: 1,
  secs: 1,
  second: 1,
  seconds: 1,
  min: 60,
  mins: 60,
  minute: 60,
  minutes: 60,
  h: 3600,
  hr: 3600,
  hrs: 3600,
  hour: 3600,
  hours: 3600,
};

function colonDurationSeconds(value: string): number | undefined {
  const parts = value.split(':');
  if (parts.length !== 2 && parts.length !== 3) return undefined;
  if (!parts.every((part) => /^\d+$/.test(part))) return undefined;

  const numbers = parts.map(Number);
  const seconds = numbers[numbers.length - 1];
  const minutes = numbers[numbers.length - 2];
  if (seconds > 59 || minutes > 59) return undefined;

  const hours = parts.length === 3 ? numbers[0] : 0;
  const total = (hours * 3600) + (minutes * 60) + seconds;
  return total > 0 ? total : undefined;
}

function durationSeconds(entity: EntityStateLike | undefined): number | undefined {
  if (!entity) return undefined;
  const value = String(entity.state ?? '').trim();
  if (!value) return undefined;

  if (value.includes(':')) return colonDurationSeconds(value);

  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue <= 0) return undefined;

  const unit = String(entity.attributes?.unit_of_measurement ?? '').trim().toLowerCase();
  const multiplier = UNIT_MULTIPLIERS[unit];
  if (!multiplier) return undefined;

  return numericValue * multiplier;
}

function localDayOrdinal(date: Date): number {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

export function finishTimeText(
  entity: EntityStateLike | undefined,
  language: Language,
  now = new Date(),
): string | undefined {
  const seconds = durationSeconds(entity);
  if (!seconds) return undefined;

  const finish = new Date(now.getTime() + (seconds * 1000));
  if (!Number.isFinite(finish.getTime())) return undefined;

  const locale = LOCALES[language];
  const time = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(finish);

  const dayDifference = Math.round(
    (localDayOrdinal(finish) - localDayOrdinal(now)) / 86_400_000,
  );

  if (dayDifference === 0) return time;
  if (dayDifference === 1) {
    return TOMORROW_AT[language].replace('{time}', time);
  }

  const date = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
  }).format(finish);
  return `${date}, ${time}`;
}
