import type { CardMode, EntityStateLike, PrinterStatusCardConfig } from './types';

export const OFFLINE_STATES = new Set([
  '',
  'unknown',
  'unavailable',
  'none',
  'null',
  'offline',
]);

export function normalizedState(entity: EntityStateLike | undefined): string {
  return String(entity?.state ?? '').trim().toLowerCase();
}

export function isOfflineState(entity: EntityStateLike | undefined): boolean {
  return OFFLINE_STATES.has(normalizedState(entity));
}

export function resolveCardMode(
  config: PrinterStatusCardConfig,
  states: Record<string, EntityStateLike | undefined>,
): CardMode {
  const switchId = config.entities.power_switch;
  if (switchId) {
    const switchState = normalizedState(states[switchId]);
    if (OFFLINE_STATES.has(switchState)) return 'offline';
    if (switchState !== 'on') return 'powered_off';
  }

  const powerId = config.entities.power_now;
  if (powerId) {
    const powerState = normalizedState(states[powerId]);
    if (OFFLINE_STATES.has(powerState)) return 'offline';

    const currentPower = Number(powerState);
    if (!Number.isFinite(currentPower)) return 'offline';
    if (currentPower <= 0) return 'powered_off';
  }

  const statusId = config.entities.status;
  if (statusId && isOfflineState(states[statusId])) return 'offline';

  return 'expanded';
}
