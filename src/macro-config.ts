import type { MacroEditorRow, PrinterMacro } from './types';

function prettyJson(value: Record<string, unknown> | undefined): string {
  return JSON.stringify(value ?? {}, null, 2);
}

function nonEmptyObject(value: Record<string, unknown>): boolean {
  return Object.keys(value).length > 0;
}

export function macroToEditorRow(macro: PrinterMacro): MacroEditorRow {
  return {
    name: macro.name ?? '',
    kind: macro.service ? 'service' : 'entity',
    entity: macro.entity ?? '',
    service: macro.service ?? '',
    service_data_text: prettyJson(macro.service_data),
    target_text: prettyJson(macro.target),
  };
}

export function parseJsonObject(text: string): Record<string, unknown> | undefined {
  try {
    const parsed = JSON.parse(text.trim() || '{}');
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return undefined;
    return parsed as Record<string, unknown>;
  } catch {
    return undefined;
  }
}

export function rowsToMacros(rows: MacroEditorRow[]): {
  macros: PrinterMacro[];
  errors: Record<string, boolean>;
} {
  const errors: Record<string, boolean> = {};
  const macros: PrinterMacro[] = [];

  rows.forEach((row, index) => {
    if (row.kind === 'entity') {
      if (row.entity) macros.push({ name: row.name || undefined, entity: row.entity });
      return;
    }

    const serviceData = parseJsonObject(row.service_data_text);
    const target = parseJsonObject(row.target_text);
    if (!serviceData) errors[`${index}.service_data_text`] = true;
    if (!target) errors[`${index}.target_text`] = true;
    if (!serviceData || !target || !row.service) return;

    macros.push({
      name: row.name || undefined,
      service: row.service,
      ...(nonEmptyObject(serviceData) ? { service_data: serviceData } : {}),
      ...(nonEmptyObject(target) ? { target } : {}),
    });
  });

  return Object.keys(errors).length > 0
    ? { macros: [], errors }
    : { macros, errors };
}
