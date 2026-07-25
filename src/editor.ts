import type {
  HomeAssistant,
  LovelaceCardEditor,
  LovelaceConfig,
} from 'custom-card-helpers';
import { css, html, LitElement, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import { normalizeConfig } from './config';
import { localize } from './localize/localize';
import { macroToEditorRow, rowsToMacros } from './macro-config';
import type {
  MacroEditorRow,
  PrinterStatusCardConfig,
} from './types';

type Schema = Record<string, unknown>;
type MacroJsonField = 'service_data_text' | 'target_text';

const FIELD_LABELS: Record<string, string> = {
  language: 'fields.language',
  name: 'fields.name',
  show_camera: 'fields.showCamera',
  camera_view: 'fields.cameraView',
  status: 'fields.status',
  remaining_time: 'fields.remainingTime',
  elapsed_time: 'fields.elapsedTime',
  filament_used: 'fields.filamentUsed',
  bed_temp: 'fields.bedTemperature',
  extruder_temp: 'fields.extruderTemperature',
  total_print_time: 'fields.totalPrintTime',
  filament_present: 'fields.filamentPresent',
  filename: 'fields.filename',
  camera: 'fields.camera',
  power_switch: 'fields.powerSwitch',
  power_now: 'fields.powerNow',
  filament_present_state: 'fields.filamentPresentState',
  filament_missing_state: 'fields.filamentMissingState',
  spool_id: 'fields.spoolId',
  set_active_spool_service: 'fields.setActiveSpoolService',
  get_active_spool_service: 'fields.getActiveSpoolService',
  spool_entity_template: 'fields.spoolEntityTemplate',
  filament_name_entity_template: 'fields.filamentNameEntityTemplate',
  filament_material_entity_template: 'fields.filamentMaterialEntityTemplate',
  vendor_name_entity_template: 'fields.vendorNameEntityTemplate',
  color_hex_entity_template: 'fields.colorHexEntityTemplate',
  id_entity_template: 'fields.idEntityTemplate',
  macroName: 'fields.macroName',
  macroKind: 'fields.macroKind',
  macroEntity: 'fields.macroEntity',
  macroService: 'fields.macroService',
};

export class PrinterStatusCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public lovelace?: LovelaceConfig;
  @state() private _config = normalizeConfig({ type: 'custom:printer-status-card' });
  @state() private _macroRows: MacroEditorRow[] = [];
  @state() private _macroErrors: Record<string, boolean> = {};

  public static styles = css`
    :host {
      display: block;
    }

    .section {
      margin: 10px 0;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      overflow: hidden;
    }

    .section-title {
      padding: 12px 16px;
      color: var(--primary-text-color);
      font-size: 15px;
      font-weight: 600;
      background: var(--secondary-background-color);
    }

    .section-body {
      padding: 14px 16px;
    }

    .help {
      margin: 0 0 12px;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.4;
    }

    .macro-list {
      display: grid;
      gap: 12px;
    }

    .macro-row {
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
    }

    .macro-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 10px;
    }

    .macro-title {
      color: var(--primary-text-color);
      font-weight: 600;
    }

    .macro-actions {
      display: flex;
      gap: 4px;
    }

    button {
      min-height: 34px;
      padding: 6px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color);
      cursor: pointer;
    }

    button:disabled {
      opacity: .45;
      cursor: default;
    }

    .add-button {
      width: 100%;
      margin-top: 12px;
    }

    .json-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin-top: 10px;
    }

    .json-field label {
      display: block;
      margin-bottom: 6px;
      color: var(--secondary-text-color);
      font-size: 12px;
    }

    textarea {
      width: 100%;
      min-height: 104px;
      box-sizing: border-box;
      resize: vertical;
      padding: 9px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      color: var(--primary-text-color);
      background: var(--card-background-color, var(--ha-card-background));
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }

    textarea.invalid {
      border-color: var(--error-color);
    }

    .error {
      margin-top: 4px;
      color: var(--error-color);
      font-size: 12px;
    }

    .empty {
      color: var(--secondary-text-color);
      font-size: 13px;
      text-align: center;
    }

    @media (max-width: 520px) {
      .json-grid { grid-template-columns: 1fr; }
    }
  `;

  public setConfig(config: PrinterStatusCardConfig): void {
    this._config = normalizeConfig(config);
    this._macroRows = this._config.macros.map(macroToEditorRow);
    this._macroErrors = {};
  }

  protected render(): TemplateResult {
    if (!this.hass) return html``;

    return html`
      ${this._renderSection(
        this._t('editor.general'),
        {
          language: this._config.language,
          name: this._config.name,
          show_camera: this._config.show_camera,
          camera_view: this._config.camera_view,
        },
        this._generalSchema(),
        this._generalChanged,
      )}

      ${this._renderSection(
        this._t('editor.printerEntities'),
        this._config.entities,
        this._printerEntitiesSchema(),
        this._entitiesChanged,
      )}

      ${this._renderSection(
        this._t('editor.power'),
        {
          power_switch: this._config.entities.power_switch,
          power_now: this._config.entities.power_now,
        },
        this._powerSchema(),
        this._entitiesChanged,
        this._t('editor.powerHelp'),
      )}

      ${this._renderSection(
        this._t('editor.filamentStates'),
        {
          filament_present_state: this._config.filament_present_state,
          filament_missing_state: this._config.filament_missing_state,
        },
        this._filamentSchema(),
        this._generalChanged,
      )}

      ${this._renderSection(
        this._t('editor.spoolman'),
        {
          spool_id: this._config.entities.spool_id,
          ...this._config.spoolman,
        },
        this._spoolmanSchema(),
        this._spoolmanChanged,
      )}

      ${this._renderMacroEditor()}
    `;
  }

  private _t(key: string): string {
    return localize(this._config.language, key);
  }

  private _computeLabel = (schema: { name?: string }): string => {
    if (!schema.name) return '';
    const key = FIELD_LABELS[schema.name];
    return key ? this._t(key) : schema.name;
  };

  private _renderSection(
    title: string,
    data: Record<string, unknown>,
    schema: Schema[],
    handler: (event: CustomEvent) => void,
    help?: string,
  ): TemplateResult {
    return html`
      <section class="section">
        <div class="section-title">${title}</div>
        <div class="section-body">
          ${help ? html`<p class="help">${help}</p>` : nothing}
          <ha-form
            .hass=${this.hass}
            .data=${data}
            .schema=${schema}
            .computeLabel=${this._computeLabel}
            @value-changed=${handler}
          ></ha-form>
        </div>
      </section>
    `;
  }

  private _generalSchema(): Schema[] {
    return [{
      type: 'grid',
      column_min_width: '180px',
      schema: [
        {
          name: 'language',
          selector: {
            select: {
              mode: 'dropdown',
              options: [
                { value: 'en', label: this._t('options.english') },
                { value: 'ru', label: this._t('options.russian') },
                { value: 'uk', label: this._t('options.ukrainian') },
              ],
            },
          },
        },
        { name: 'name', selector: { text: {} } },
        { name: 'show_camera', selector: { boolean: {} } },
        {
          name: 'camera_view',
          selector: {
            select: {
              options: [
                { value: 'live', label: this._t('options.live') },
                { value: 'auto', label: this._t('options.auto') },
              ],
            },
          },
        },
      ],
    }];
  }

  private _printerEntitiesSchema(): Schema[] {
    return [{
      type: 'grid',
      column_min_width: '210px',
      schema: [
        { name: 'status', selector: { entity: {} } },
        { name: 'remaining_time', selector: { entity: {} } },
        { name: 'elapsed_time', selector: { entity: {} } },
        { name: 'filament_used', selector: { entity: {} } },
        { name: 'bed_temp', selector: { entity: {} } },
        { name: 'extruder_temp', selector: { entity: {} } },
        { name: 'total_print_time', selector: { entity: {} } },
        { name: 'filament_present', selector: { entity: {} } },
        { name: 'filename', selector: { entity: {} } },
        { name: 'camera', selector: { entity: { domain: 'camera' } } },
      ],
    }];
  }

  private _powerSchema(): Schema[] {
    return [{
      type: 'grid',
      column_min_width: '210px',
      schema: [
        { name: 'power_switch', selector: { entity: { domain: 'switch' } } },
        { name: 'power_now', selector: { entity: { domain: 'sensor' } } },
      ],
    }];
  }

  private _filamentSchema(): Schema[] {
    return [{
      type: 'grid',
      column_min_width: '180px',
      schema: [
        { name: 'filament_present_state', selector: { text: {} } },
        { name: 'filament_missing_state', selector: { text: {} } },
      ],
    }];
  }

  private _spoolmanSchema(): Schema[] {
    return [{
      type: 'grid',
      column_min_width: '220px',
      schema: [
        { name: 'spool_id', selector: { entity: {} } },
        { name: 'set_active_spool_service', selector: { text: {} } },
        { name: 'get_active_spool_service', selector: { text: {} } },
        { name: 'spool_entity_template', selector: { text: {} } },
        { name: 'filament_name_entity_template', selector: { text: {} } },
        { name: 'filament_material_entity_template', selector: { text: {} } },
        { name: 'vendor_name_entity_template', selector: { text: {} } },
        { name: 'color_hex_entity_template', selector: { text: {} } },
        { name: 'id_entity_template', selector: { text: {} } },
      ],
    }];
  }

  private _generalChanged = (event: CustomEvent): void => {
    this._emitConfig({ ...this._config, ...event.detail.value });
  };

  private _entitiesChanged = (event: CustomEvent): void => {
    this._emitConfig({
      ...this._config,
      entities: { ...this._config.entities, ...event.detail.value },
    });
  };

  private _spoolmanChanged = (event: CustomEvent): void => {
    const value = event.detail.value ?? {};
    const { spool_id, ...spoolman } = value;
    this._emitConfig({
      ...this._config,
      entities: { ...this._config.entities, spool_id },
      spoolman: { ...this._config.spoolman, ...spoolman },
    });
  };

  private _emitConfig(config: PrinterStatusCardConfig): void {
    this._config = normalizeConfig(config);
    this.dispatchEvent(new CustomEvent('config-changed', {
      bubbles: true,
      composed: true,
      detail: { config: this._config },
    }));
  }

  private _renderMacroEditor(): TemplateResult {
    return html`
      <section class="section">
        <div class="section-title">${this._t('editor.macros')}</div>
        <div class="section-body">
          <div class="macro-list">
            ${this._macroRows.length === 0
              ? html`<div class="empty">${this._t('editor.noMacros')}</div>`
              : this._macroRows.map((row, index) => this._renderMacroRow(row, index))}
          </div>
          <button class="add-button" @click=${this._addMacro}>＋ ${this._t('actions.addMacro')}</button>
        </div>
      </section>
    `;
  }

  private _renderMacroRow(row: MacroEditorRow, index: number): TemplateResult {
    const basicData = row.kind === 'entity'
      ? { macroName: row.name, macroKind: row.kind, macroEntity: row.entity }
      : { macroName: row.name, macroKind: row.kind, macroService: row.service };
    const basicSchema: Schema[] = [{
      type: 'grid',
      column_min_width: '180px',
      schema: [
        { name: 'macroName', selector: { text: {} } },
        {
          name: 'macroKind',
          selector: {
            select: {
              options: [
                { value: 'entity', label: this._t('options.entity') },
                { value: 'service', label: this._t('options.service') },
              ],
            },
          },
        },
        row.kind === 'entity'
          ? { name: 'macroEntity', selector: { entity: {} } }
          : { name: 'macroService', selector: { text: {} } },
      ],
    }];

    return html`
      <article class="macro-row">
        <div class="macro-header">
          <div class="macro-title">${this._t('editor.macro')} ${index + 1}</div>
          <div class="macro-actions">
            <button
              title=${this._t('actions.moveUp')}
              ?disabled=${index === 0}
              @click=${() => this._moveMacro(index, -1)}
            >↑</button>
            <button
              title=${this._t('actions.moveDown')}
              ?disabled=${index === this._macroRows.length - 1}
              @click=${() => this._moveMacro(index, 1)}
            >↓</button>
            <button title=${this._t('actions.removeMacro')} @click=${() => this._removeMacro(index)}>×</button>
          </div>
        </div>

        <ha-form
          .hass=${this.hass}
          .data=${basicData}
          .schema=${basicSchema}
          .computeLabel=${this._computeLabel}
          @value-changed=${(event: CustomEvent) => this._macroBasicChanged(index, event)}
        ></ha-form>

        ${row.kind === 'service' ? html`
          <div class="json-grid">
            ${this._renderJsonField(index, 'service_data_text', 'fields.serviceData', row.service_data_text)}
            ${this._renderJsonField(index, 'target_text', 'fields.target', row.target_text)}
          </div>
        ` : nothing}
      </article>
    `;
  }

  private _renderJsonField(
    index: number,
    field: MacroJsonField,
    labelKey: string,
    value: string,
  ): TemplateResult {
    const errorKey = `${index}.${field}`;
    const invalid = this._macroErrors[errorKey] === true;
    return html`
      <div class="json-field">
        <label>${this._t(labelKey)}</label>
        <textarea
          class=${invalid ? 'invalid' : ''}
          .value=${value}
          @input=${(event: InputEvent) => this._macroJsonChanged(
            index,
            field,
            (event.currentTarget as HTMLTextAreaElement).value,
          )}
        ></textarea>
        ${invalid ? html`<div class="error">${this._t('editor.invalidJson')}</div>` : nothing}
      </div>
    `;
  }

  private _addMacro = (): void => {
    this._macroRows = [
      ...this._macroRows,
      {
        name: '',
        kind: 'entity',
        entity: '',
        service: '',
        service_data_text: '{}',
        target_text: '{}',
      },
    ];
  };

  private _removeMacro(index: number): void {
    this._macroRows = this._macroRows.filter((_, rowIndex) => rowIndex !== index);
    this._macroErrors = {};
    this._commitMacros();
  }

  private _moveMacro(index: number, direction: -1 | 1): void {
    const target = index + direction;
    if (target < 0 || target >= this._macroRows.length) return;
    const rows = [...this._macroRows];
    [rows[index], rows[target]] = [rows[target], rows[index]];
    this._macroRows = rows;
    this._macroErrors = {};
    this._commitMacros();
  }

  private _macroBasicChanged(index: number, event: CustomEvent): void {
    const value = event.detail.value ?? {};
    const rows = [...this._macroRows];
    rows[index] = {
      ...rows[index],
      name: String(value.macroName ?? ''),
      kind: value.macroKind === 'service' ? 'service' : 'entity',
      entity: String(value.macroEntity ?? rows[index].entity ?? ''),
      service: String(value.macroService ?? rows[index].service ?? ''),
    };
    this._macroRows = rows;
    this._commitMacros();
  }

  private _macroJsonChanged(index: number, field: MacroJsonField, value: string): void {
    const rows = [...this._macroRows];
    rows[index] = { ...rows[index], [field]: value };
    this._macroRows = rows;
    this._commitMacros();
  }

  private _commitMacros(): void {
    const { macros, errors } = rowsToMacros(this._macroRows);
    this._macroErrors = errors;
    if (Object.keys(errors).length > 0) return;
    this._emitConfig({ ...this._config, macros });
  }
}

if (!customElements.get('printer-status-card-editor')) {
  customElements.define('printer-status-card-editor', PrinterStatusCardEditor);
}
