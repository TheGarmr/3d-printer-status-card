import type { EntityStateLike } from './types';

export type MeterLevel = 'normal' | 'warning' | 'critical';

export function numericState(entity: EntityStateLike | undefined): number | undefined {
  if (!entity) return undefined;
  const raw = String(entity.state ?? '').trim();
  if (raw === '') return undefined;
  const value = Number(raw);
  return Number.isFinite(value) ? value : undefined;
}

export function percentState(entity: EntityStateLike | undefined): number | undefined {
  if (entity?.attributes?.unit_of_measurement !== '%') return undefined;
  const value = numericState(entity);
  return value === undefined ? undefined : Math.min(100, Math.max(0, value));
}

export function meterLevel(percent: number): MeterLevel {
  if (percent >= 90) return 'critical';
  if (percent >= 75) return 'warning';
  return 'normal';
}

export function formatPercent(percent: number): string {
  return `${Math.floor(percent)}%`;
}

export function layerText(
  current: EntityStateLike | undefined,
  total: EntityStateLike | undefined,
): string | undefined {
  const currentLayer = numericState(current);
  if (currentLayer === undefined) return undefined;
  const totalLayers = numericState(total);
  return totalLayers && totalLayers > 0
    ? `${Math.round(currentLayer)} / ${Math.round(totalLayers)}`
    : String(Math.round(currentLayer));
}

export function temperatureWithTargetText(
  current: EntityStateLike | undefined,
  target: EntityStateLike | undefined,
): string | undefined {
  const currentValue = numericState(current);
  const targetValue = numericState(target);
  if (currentValue === undefined || targetValue === undefined || targetValue <= 0) {
    return undefined;
  }

  const unit = current?.attributes?.unit_of_measurement
    ?? target?.attributes?.unit_of_measurement;
  const text = `${Number(currentValue.toFixed(1))} / ${Math.round(targetValue)}`;
  return unit ? `${text} ${unit}` : text;
}
