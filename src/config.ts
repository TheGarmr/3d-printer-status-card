import type {
  Language,
  PrinterMacro,
  PrinterStatusCardConfig,
  SpoolmanConfig,
} from './types';

export const DEFAULT_SPOOLMAN: Readonly<SpoolmanConfig> = Object.freeze({
  set_active_spool_service: '',
  spool_entity_template: 'sensor.spoolman_spool_{id}',
  filament_name_entity_template: 'sensor.spoolman_spool_{id}_filament_name',
  color_hex_entity_template: 'sensor.spoolman_spool_{id}_color_hex',
  id_entity_template: 'sensor.spoolman_spool_{id}_id',
});

const LANGUAGES = new Set<Language>(['en', 'ru', 'uk']);

function cloneMacro(macro: PrinterMacro): PrinterMacro {
  return {
    ...macro,
    ...(macro.service_data ? { service_data: { ...macro.service_data } } : {}),
    ...(macro.target ? { target: { ...macro.target } } : {}),
  };
}

export function normalizeConfig(
  input: Partial<PrinterStatusCardConfig> & Record<string, unknown>,
): PrinterStatusCardConfig {
  const requestedLanguage = String(input.language ?? 'en') as Language;
  const language: Language = LANGUAGES.has(requestedLanguage) ? requestedLanguage : 'en';
  const cameraView = input.camera_view === 'auto' ? 'auto' : 'live';

  return {
    ...input,
    type: String(input.type ?? 'custom:printer-status-card'),
    name: String(input.name ?? '3D Printer'),
    language,
    show_camera: input.show_camera !== false,
    camera_view: cameraView,
    filament_present_state: String(input.filament_present_state ?? 'on'),
    filament_missing_state: String(input.filament_missing_state ?? 'off'),
    entities: { ...(input.entities ?? {}) },
    spoolman: { ...DEFAULT_SPOOLMAN, ...(input.spoolman ?? {}) },
    macros: Array.isArray(input.macros) ? input.macros.map(cloneMacro) : [],
  } as PrinterStatusCardConfig;
}

export function getStubConfig(): PrinterStatusCardConfig {
  return normalizeConfig({ type: 'custom:printer-status-card' });
}
