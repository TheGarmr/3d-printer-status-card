export const DEFAULT_FILAMENT_DENSITY = 1.24;
export const DEFAULT_FILAMENT_DIAMETER = 1.75;

function recordValue(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : undefined;
}

function positiveNumber(value: unknown): number | undefined {
  const number = typeof value === 'string' && value.trim() === '' ? NaN : Number(value);
  return Number.isFinite(number) && number > 0 ? number : undefined;
}

export function extractFileMetadata(responseValue: unknown): Record<string, unknown> | undefined {
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

  const payload = recordValue(content);
  return recordValue(payload?.result) ?? payload;
}

export function requiredFilamentGrams(
  metadata: Record<string, unknown> | undefined,
  density: unknown = DEFAULT_FILAMENT_DENSITY,
  diameter: unknown = DEFAULT_FILAMENT_DIAMETER,
): number | undefined {
  if (!metadata) return undefined;

  const weight = positiveNumber(metadata.filament_weight_total);
  if (weight !== undefined) return Math.round(weight * 10) / 10;

  const lengthMm = positiveNumber(metadata.filament_total);
  if (lengthMm === undefined) return undefined;

  const gramsPerCm3 = positiveNumber(density) ?? DEFAULT_FILAMENT_DENSITY;
  const diameterMm = positiveNumber(diameter) ?? DEFAULT_FILAMENT_DIAMETER;
  const volumeCm3 = (lengthMm * Math.PI * (diameterMm / 2) ** 2) / 1000;
  return Math.round(volumeCm3 * gramsPerCm3 * 10) / 10;
}

export function remainingFilamentGrams(
  requiredGrams: number,
  progressPercent: number | undefined,
): number {
  if (progressPercent === undefined) return requiredGrams;
  const done = Math.min(100, Math.max(0, progressPercent)) / 100;
  return Math.round(requiredGrams * (1 - done) * 10) / 10;
}

export function formatGrams(grams: number): string {
  return `${grams >= 100 ? Math.round(grams) : Math.round(grams * 10) / 10} g`;
}
