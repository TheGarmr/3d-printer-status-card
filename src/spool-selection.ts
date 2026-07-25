import type { EntityStateLike } from './types';

const UNAVAILABLE_STATES = new Set([
  '',
  'unknown',
  'unavailable',
  'none',
  'null',
  'offline',
]);

const MAX_OPTION_LABEL_LENGTH = 42;

function stateText(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value).trim();
  }
  if (!value || typeof value !== 'object') return '';

  const formatted = value as { raw?: unknown; translated?: unknown };
  return stateText(formatted.raw) || stateText(formatted.translated);
}

function isUnavailable(entity: EntityStateLike | undefined): boolean {
  return UNAVAILABLE_STATES.has(stateText(entity?.state).toLowerCase());
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

export function resolveSpoolSelectionValue(
  activeSpoolId: string | undefined,
  pendingSpoolId: string | undefined,
): string {
  return pendingSpoolId ?? activeSpoolId ?? '';
}

function recordValue(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : undefined;
}

export function extractConfirmedSpoolId(responseValue: unknown): string | undefined {
  const root = recordValue(responseValue);
  if (!root) return undefined;

  const response = recordValue(root.response) ?? root;
  const status = Number(response.status);
  if (Number.isFinite(status) && (status < 200 || status >= 300)) return undefined;

  let content: unknown = response.content ?? response;
  if (typeof content === 'string') {
    try {
      content = JSON.parse(content);
    } catch {
      return undefined;
    }
  }

  const spoolId = stateText(recordValue(content)?.spool_id);
  return /^\d+$/.test(spoolId) ? spoolId : undefined;
}

function entityValue(
  states: Record<string, EntityStateLike | undefined>,
  template: string,
  id: string,
): string | undefined {
  const entity = states[template.replaceAll('{id}', id)];
  return entity && !isUnavailable(entity) ? stateText(entity.state) : undefined;
}

function attributeValue(
  attributes: Record<string, unknown>,
  keys: string[],
): string | undefined {
  for (const key of keys) {
    const value = attributes[key];
    if (value === undefined || value === null) continue;
    const text = String(value).trim();
    if (text && !UNAVAILABLE_STATES.has(text.toLowerCase())) return text;
  }
  return undefined;
}

function spoolOptionLabel(parts: Array<string | undefined>, id: string): string {
  const seen = new Set<string>();
  const details = parts
    .filter((part): part is string => Boolean(part))
    .filter((part) => {
      const normalized = part.toLowerCase();
      if (normalized === id.toLowerCase() || seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    })
    .join(' · ');
  if (!details) return id;

  const label = `${details} · ${id}`;
  if (label.length <= MAX_OPTION_LABEL_LENGTH) return label;

  const suffix = `… · ${id}`;
  const detailsLength = Math.max(0, MAX_OPTION_LABEL_LENGTH - suffix.length);
  return `${details.slice(0, detailsLength).trimEnd()}${suffix}`;
}

export function discoverSpoolOptions(
  states: Record<string, EntityStateLike | undefined>,
  spoolTemplate: string,
  idEntityTemplate: string,
  filamentNameTemplate: string,
  filamentMaterialTemplate: string,
  vendorNameTemplate: string,
): SpoolOption[] {
  if (!idEntityTemplate.includes('{id}')) return [];

  const [prefix, suffix] = idEntityTemplate.split('{id}', 2);
  const options: SpoolOption[] = [];

  for (const [entityId, entity] of Object.entries(states)) {
    if (!entityId.startsWith(prefix) || !entityId.endsWith(suffix)) continue;

    if (!entity || isUnavailable(entity)) continue;

    const id = stateText(entity.state);
    if (!/^\d+$/.test(id)) continue;

    const mainEntity = spoolTemplate.includes('{id}')
      ? states[spoolTemplate.replaceAll('{id}', id)]
      : undefined;
    if (entity.attributes?.archived === true || mainEntity?.attributes?.archived === true) {
      continue;
    }

    const attributes = mainEntity?.attributes ?? {};
    const name = entityValue(states, filamentNameTemplate, id)
      ?? attributeValue(attributes, ['filament_name', 'name']);
    const material = entityValue(states, filamentMaterialTemplate, id)
      ?? attributeValue(attributes, ['filament_material', 'material']);
    const vendor = entityValue(states, vendorNameTemplate, id)
      ?? attributeValue(attributes, ['filament_vendor_name', 'vendor_name', 'vendor']);

    options.push({ id, label: spoolOptionLabel([name, material, vendor], id) });
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
