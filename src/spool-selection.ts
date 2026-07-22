import type { EntityStateLike } from './types';

const UNAVAILABLE_STATES = new Set([
  '',
  'unknown',
  'unavailable',
  'none',
  'null',
  'offline',
]);

function isUnavailable(entity: EntityStateLike | undefined): boolean {
  return UNAVAILABLE_STATES.has(String(entity?.state ?? '').trim().toLowerCase());
}

export interface SpoolOption {
  id: string;
  label: string;
}

export interface ServiceReference {
  domain: string;
  service: string;
}

export function isActiveSpoolOption(
  optionId: string,
  activeSpoolId: string | undefined,
): boolean {
  return activeSpoolId !== undefined && optionId === activeSpoolId;
}

export function discoverSpoolOptions(
  states: Record<string, EntityStateLike | undefined>,
  spoolTemplate: string,
  filamentNameTemplate: string,
): SpoolOption[] {
  if (!spoolTemplate.includes('{id}')) return [];

  const [prefix, suffix] = spoolTemplate.split('{id}', 2);
  const options: SpoolOption[] = [];

  for (const [entityId, entity] of Object.entries(states)) {
    if (!entityId.startsWith(prefix) || !entityId.endsWith(suffix)) continue;

    const idEnd = suffix.length > 0 ? -suffix.length : undefined;
    const id = entityId.slice(prefix.length, idEnd);
    if (!/^\d+$/.test(id)) continue;
    if (!entity || isUnavailable(entity) || entity.attributes?.archived === true) continue;

    const nameEntity = states[filamentNameTemplate.replaceAll('{id}', id)];
    const attributes = entity.attributes ?? {};
    const name = nameEntity && !isUnavailable(nameEntity)
      ? nameEntity.state
      : String(
        attributes.filament_name
        ?? attributes.name
        ?? attributes.material
        ?? `Spool ${id}`,
      );

    options.push({ id, label: `ID ${id} · ${name}` });
  }

  return options.sort((left, right) => Number(left.id) - Number(right.id));
}

export function parseServiceReference(value: string): ServiceReference | undefined {
  const match = value.trim().match(/^([a-z0-9_]+)\.([a-z0-9_]+)$/i);
  return match ? { domain: match[1], service: match[2] } : undefined;
}

export function buildSpoolServiceData(id: string): Record<string, unknown> | undefined {
  if (!/^\d+$/.test(id)) return undefined;
  return { spool_id: Number(id), useragent: '3D-printer-status-card' };
}
