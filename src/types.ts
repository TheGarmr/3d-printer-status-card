import type { LovelaceCardConfig } from 'custom-card-helpers';

export type Language = 'en' | 'ru' | 'uk';
export type CardMode = 'expanded' | 'powered_off' | 'offline';
export type MacroKind = 'entity' | 'service';

export interface PrinterEntities {
  status?: string;
  remaining_time?: string;
  elapsed_time?: string;
  filament_used?: string;
  bed_temp?: string;
  extruder_temp?: string;
  total_print_time?: string;
  filament_present?: string;
  filename?: string;
  progress?: string;
  current_layer?: string;
  total_layer?: string;
  system_load?: string;
  memory_used?: string;
  bed_target?: string;
  extruder_target?: string;
  thumbnail?: string;
  emergency_stop?: string;
  filament_required?: string;
  power_now?: string;
  power_switch?: string;
  camera?: string;
  spool_id?: string;
  [key: string]: string | undefined;
}

export interface SpoolmanConfig {
  set_active_spool_service: string;
  get_active_spool_service: string;
  spool_entity_template: string;
  filament_name_entity_template: string;
  filament_material_entity_template: string;
  vendor_name_entity_template: string;
  color_hex_entity_template: string;
  id_entity_template: string;
}

export interface PrinterMacro {
  name?: string;
  entity?: string;
  service?: string;
  service_data?: Record<string, unknown>;
  target?: Record<string, unknown>;
}

export interface PrinterStatusCardConfig extends LovelaceCardConfig {
  type: string;
  name: string;
  language: Language;
  show_camera: boolean;
  camera_view: 'auto' | 'live';
  show_progress: boolean;
  show_system_load: boolean;
  show_memory: boolean;
  show_thumbnail: boolean;
  show_emergency_stop: boolean;
  show_filament_required: boolean;
  file_metadata_service: string;
  filament_present_state: string;
  filament_missing_state: string;
  entities: PrinterEntities;
  spoolman: SpoolmanConfig;
  macros: PrinterMacro[];
  [key: string]: unknown;
}

export interface EntityStateLike {
  state: string;
  attributes?: Record<string, unknown>;
}

export interface MacroEditorRow {
  name: string;
  kind: MacroKind;
  entity: string;
  service: string;
  service_data_text: string;
  target_text: string;
}
