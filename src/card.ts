import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
} from 'custom-card-helpers';
import {
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { property, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';

import { getStubConfig, normalizeConfig } from './config';
import { filamentIndicatorState } from './filament-indicator';
import { finishTimeText } from './finish-time';
import { localize } from './localize/localize';
import { isOfflineState, resolveCardMode } from './power-state';
import {
  buildSpoolServiceData,
  discoverSpoolOptions,
  extractConfirmedSpoolId,
  isActiveSpoolOption,
  parseServiceReference,
  resolveSpoolSelectionValue,
} from './spool-selection';
import { isActivePrintStatus, printerStatusDisplay } from './status-display';
import { cardStyles } from './styles';
import type {
  CardMode,
  PrinterEntities,
  PrinterMacro,
  PrinterStatusCardConfig,
} from './types';

type FormattableHass = HomeAssistant & {
  formatEntityState?: (entity: HomeAssistant['states'][string]) => string;
};

type CardHelpers = {
  createCardElement: (config: Record<string, unknown>) => LovelaceCard;
};

declare global {
  interface Window {
    loadCardHelpers?: () => Promise<CardHelpers>;
  }
}

export class PrinterStatusCard extends LitElement implements LovelaceCard {
  public static styles = cardStyles;

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config = getStubConfig();
  @state() private _cameraError = false;
  @state() private _pendingSpoolId?: string;
  @state() private _spoolSelectionBusy = false;

  private _cameraCard?: LovelaceCard;
  private _cameraEntity?: string;
  private _cameraFailedEntity?: string;
  private _selectionBaselineSpoolId?: string;

  public setConfig(config: PrinterStatusCardConfig): void {
    this._config = normalizeConfig(config);
    this._cameraCard = undefined;
    this._cameraEntity = undefined;
    this._cameraFailedEntity = undefined;
    this._cameraError = false;
    this._pendingSpoolId = undefined;
    this._spoolSelectionBusy = false;
    this._selectionBaselineSpoolId = undefined;
  }

  public static getStubConfig(): PrinterStatusCardConfig {
    return getStubConfig();
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement('printer-status-card-editor') as LovelaceCardEditor;
  }

  public getCardSize(): number {
    if (!this.hass) return 3;
    return resolveCardMode(this._config, this.hass.states) === 'expanded'
      ? (this._config.show_camera ? 9 : 6)
      : 1;
  }

  public getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }

  protected render(): TemplateResult {
    if (!this.hass) return html``;

    const mode = resolveCardMode(this._config, this.hass.states);
    const expanded = mode === 'expanded';

    return html`
      <ha-card>
        <div class="card">
          ${this._renderHeader(mode)}
          ${expanded ? this._renderExpanded() : nothing}
        </div>
      </ha-card>
    `;
  }

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    if (!changedProperties.has('hass') || !this._pendingSpoolId) return;

    const activeSpoolId = this._activeSpoolId();
    const selectionCaughtUp = activeSpoolId === this._pendingSpoolId;
    const changedExternally = Boolean(
      activeSpoolId
      && this._selectionBaselineSpoolId
      && activeSpoolId !== this._selectionBaselineSpoolId,
    );

    if (selectionCaughtUp || changedExternally) {
      this._pendingSpoolId = undefined;
      this._selectionBaselineSpoolId = undefined;
    }
  }

  protected updated(): void {
    void this._syncCameraCard();
  }

  private _t(key: string): string {
    return localize(this._config.language, key);
  }

  private _entity(entityId?: string) {
    if (!entityId || !this.hass) return undefined;
    return this.hass.states[entityId];
  }

  private _formatEntity(entityId?: string): string {
    const entity = this._entity(entityId);
    if (!entity) return '—';

    const formatter = (this.hass as FormattableHass).formatEntityState;
    if (formatter) {
      try {
        return formatter.call(this.hass, entity);
      } catch {
        // Use the stable state/unit fallback below.
      }
    }

    const unit = entity.attributes?.unit_of_measurement;
    return `${entity.state}${unit ? ` ${unit}` : ''}`;
  }

  private _renderHeader(mode: CardMode): TemplateResult {
    const switchId = this._config.entities.power_switch;
    const switchEntity = this._entity(switchId);
    const canToggle = Boolean(switchId && switchEntity && !isOfflineState(switchEntity));
    const statusId = this._config.entities.status;

    let statusText: string;
    let statusClass: string;
    if (mode === 'powered_off') {
      statusText = this._t('status.poweredOff');
      statusClass = 'powered-off';
    } else if (mode === 'offline') {
      statusText = this._t('status.offline');
      statusClass = 'offline';
    } else if (statusId && this._entity(statusId)) {
      const rawStatus = this._entity(statusId)!.state;
      const display = printerStatusDisplay(rawStatus);
      statusText = display.translationKey ? this._t(display.translationKey) : rawStatus;
      statusClass = display.cssClass;
    } else {
      statusText = this._t('status.ready');
      statusClass = 'complete';
    }

    return html`
      <div class="header ${mode === 'expanded' ? '' : 'compact'}">
        ${canToggle ? html`
          <button
            class="power-button ${switchEntity?.state === 'on' ? 'on' : 'off'}"
            title=${this._t('actions.togglePower')}
            aria-label=${this._t('actions.togglePower')}
            @click=${this._togglePower}
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        ` : nothing}
        <div class="title">${this._config.name}</div>
        ${this._renderFilamentIndicator()}
        <div
          class="status ${statusClass} ${statusId && this._entity(statusId) ? 'clickable' : ''}"
          @click=${() => statusId && this._fireMoreInfo(statusId)}
        >${statusText}</div>
      </div>
    `;
  }

  private _renderFilamentIndicator(): TemplateResult | typeof nothing {
    const entityId = this._config.entities.filament_present;
    const entity = this._entity(entityId);
    if (!entityId || !entity || isOfflineState(entity)) return nothing;

    const indicatorState = filamentIndicatorState(
      entity.state,
      this._config.filament_present_state,
      this._config.filament_missing_state,
    );
    if (!indicatorState) return nothing;

    const label = this._t(
      indicatorState === 'present' ? 'card.filamentPresent' : 'card.filamentMissing',
    );

    return html`
      <button
        type="button"
        class="filament-indicator ${indicatorState}"
        title=${label}
        aria-label=${label}
        @click=${() => this._fireMoreInfo(entityId)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="9" cy="12" r="6"></circle>
          <circle cx="9" cy="12" r="2"></circle>
          <path d="M15 12h2.4a2.6 2.6 0 0 1 2.6 2.6V18"></path>
          <path d="M20 18v2"></path>
        </svg>
      </button>
    `;
  }

  private _renderExpanded(): TemplateResult {
    const filenameId = this._config.entities.filename;
    const filenameEntity = this._entity(filenameId);
    const showFilename = filenameId && filenameEntity && !isOfflineState(filenameEntity);
    const activePrint = this._isActivePrintJob();

    return html`
      ${showFilename ? html`
        <div class="file" @click=${() => this._fireMoreInfo(filenameId)}>
          <strong>${this._t('card.file')}:</strong> ${filenameEntity.state}
        </div>
      ` : nothing}

      ${this._renderCamera()}

      <div class="grid">
        ${activePrint
          ? this._renderEntityRow('elapsed_time', 'card.elapsedTime', 'mdi:timer-outline')
          : nothing}
        ${activePrint
          ? this._renderEntityRow('remaining_time', 'card.remainingTime', 'mdi:timer-sand')
          : nothing}
        ${activePrint ? this._renderFinishTime() : nothing}
        ${this._renderSpoolman()}
        ${activePrint
          ? this._renderEntityRow('filament_used', 'card.filamentUsed', 'mdi:printer-3d-nozzle')
          : nothing}
        ${this._renderSpoolSelect()}
        <div class="section-title printer-section-title">${this._t('card.printer')}</div>
        ${this._renderEntityRow('bed_temp', 'card.bedTemperature', 'mdi:radiator')}
        ${this._renderEntityRow('extruder_temp', 'card.extruderTemperature', 'mdi:thermometer')}
        ${this._renderEntityRow('total_print_time', 'card.totalPrintTime', 'mdi:clock-outline')}
        ${this._renderEntityRow('power_now', 'card.powerNow', 'mdi:flash')}
      </div>

      ${this._renderMacros()}
    `;
  }

  private _isActivePrintJob(): boolean {
    const statusId = this._config.entities.status;
    const statusEntity = this._entity(statusId);
    return Boolean(
      statusId
      && statusEntity
      && !isOfflineState(statusEntity)
      && isActivePrintStatus(statusEntity.state),
    );
  }

  private _renderEntityRow(
    key: keyof PrinterEntities,
    labelKey: string,
    icon: string,
  ): TemplateResult | typeof nothing {
    const entityId = this._config.entities[key];
    const entity = this._entity(entityId);
    if (!entityId || !entity || isOfflineState(entity)) return nothing;

    return html`
      <div class="row clickable" @click=${() => this._fireMoreInfo(entityId)}>
        <div class="label"><ha-icon icon=${icon}></ha-icon><span>${this._t(labelKey)}</span></div>
        <div class="value">${this._formatEntity(entityId)}</div>
      </div>
    `;
  }

  private _renderFinishTime(): TemplateResult | typeof nothing {
    const entityId = this._config.entities.remaining_time;
    const entity = this._entity(entityId);
    if (!entityId || !entity || isOfflineState(entity)) return nothing;

    const value = finishTimeText(entity, this._config.language);
    if (!value) return nothing;

    return html`
      <div class="row clickable" @click=${() => this._fireMoreInfo(entityId)}>
        <div class="label">
          <ha-icon icon="mdi:clock-end"></ha-icon>
          <span>${this._t('card.finishesAt')}</span>
        </div>
        <div class="value">${value}</div>
      </div>
    `;
  }

  private _renderCamera(): TemplateResult | typeof nothing {
    const cameraId = this._config.entities.camera;
    const camera = this._entity(cameraId);
    if (!this._config.show_camera || !cameraId || !camera || isOfflineState(camera)) return nothing;

    if (this._cameraError) {
      return html`<div class="camera-warning">${this._t('warning.cameraUnavailable')}</div>`;
    }

    // This host is managed imperatively by the Home Assistant card helper.
    // Keep it free of Lit child parts so replaceChildren() cannot invalidate
    // Lit's render markers on a later Home Assistant state update.
    return html`<div class="camera-card" data-camera-host></div>`;
  }

  private async _syncCameraCard(): Promise<void> {
    if (!this.hass) return;
    const mode = resolveCardMode(this._config, this.hass.states);
    const entityId = this._config.entities.camera;
    const entity = this._entity(entityId);
    const host = this.renderRoot.querySelector<HTMLElement>('[data-camera-host]');

    if (
      mode !== 'expanded'
      || !this._config.show_camera
      || !entityId
      || !entity
      || isOfflineState(entity)
      || !host
    ) return;

    if (this._cameraFailedEntity === entityId) return;

    try {
      if (!this._cameraCard || this._cameraEntity !== entityId) {
        const cardConfig = {
          type: 'picture-entity',
          entity: entityId,
          camera_view: this._config.camera_view,
          show_name: false,
          show_state: false,
          tap_action: { action: 'more-info' },
        };

        if (window.loadCardHelpers) {
          const helpers = await window.loadCardHelpers();
          this._cameraCard = helpers.createCardElement(cardConfig);
        } else {
          const card = document.createElement('hui-picture-entity-card') as LovelaceCard;
          card.setConfig(cardConfig);
          this._cameraCard = card;
        }
        this._cameraEntity = entityId;
      }

      if (
        !host.isConnected
        || this._config.entities.camera !== entityId
        || resolveCardMode(this._config, this.hass.states) !== 'expanded'
      ) return;

      this._cameraCard.hass = this.hass;
      if (!host.contains(this._cameraCard)) host.replaceChildren(this._cameraCard);
    } catch (error) {
      this._cameraFailedEntity = entityId;
      this._cameraError = true;
      this._logError(error);
    }
  }

  private _activeSpoolId(): string | undefined {
    const spoolIdEntity = this._entity(this._config.entities.spool_id);
    if (!spoolIdEntity || isOfflineState(spoolIdEntity)) return undefined;
    return spoolIdEntity.state.match(/\d+/)?.[0];
  }

  private _displaySpoolId(): string | undefined {
    return resolveSpoolSelectionValue(
      this._activeSpoolId(),
      this._pendingSpoolId,
    ) || undefined;
  }

  private _spoolEntityId(template: string, spoolId = this._displaySpoolId()): string | undefined {
    return spoolId ? template.replaceAll('{id}', spoolId) : undefined;
  }

  private _normalizeHexColor(value: unknown): string | undefined {
    if (typeof value !== 'string') return undefined;
    const withHash = value.trim().startsWith('#') ? value.trim() : `#${value.trim()}`;
    return /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(withHash) ? withHash : undefined;
  }

  private _spoolDetails(spoolId = this._displaySpoolId()) {
    if (!spoolId) return undefined;

    const mainId = this._spoolEntityId(this._config.spoolman.spool_entity_template, spoolId);
    const nameId = this._spoolEntityId(
      this._config.spoolman.filament_name_entity_template,
      spoolId,
    );
    const colorId = this._spoolEntityId(
      this._config.spoolman.color_hex_entity_template,
      spoolId,
    );
    const mainEntity = this._entity(mainId);
    const nameEntity = this._entity(nameId);
    const colorEntity = this._entity(colorId);
    const attrs = mainEntity?.attributes ?? {};

    const name = nameEntity && !isOfflineState(nameEntity)
      ? nameEntity.state
      : String(
        attrs.filament_name
        ?? attrs.name
        ?? attrs.material
        ?? attrs.filament_material
        ?? attrs.vendor
        ?? '—',
      );
    const color = this._normalizeHexColor(
      colorEntity && !isOfflineState(colorEntity)
        ? colorEntity.state
        : attrs.color_hex ?? attrs.filament_color_hex ?? attrs.color ?? attrs.filament_color,
    );
    const remaining = mainEntity && !isOfflineState(mainEntity)
      ? this._formatEntity(mainId)
      : String(
        attrs.remaining_weight
        ?? attrs.remaining_length
        ?? attrs.weight
        ?? attrs.used_weight
        ?? '—',
      );

    return { spoolId, mainId, nameId, colorId, name, color, remaining, mainEntity, nameEntity };
  }

  private _renderSpoolman(): TemplateResult | typeof nothing {
    const spoolIdEntityId = this._config.entities.spool_id;
    const spoolIdEntity = this._entity(spoolIdEntityId);
    const displaySpoolId = this._displaySpoolId();
    if (!spoolIdEntityId) return nothing;
    if (!displaySpoolId && (!spoolIdEntity || isOfflineState(spoolIdEntity))) return nothing;

    const details = this._spoolDetails(displaySpoolId);
    if (!details) {
      return html`
        <div class="row clickable" @click=${() => this._fireMoreInfo(spoolIdEntityId)}>
          <div class="label"><ha-icon icon="mdi:spool"></ha-icon><span>${this._t('card.activeSpool')}</span></div>
          <div class="value">—</div>
        </div>
      `;
    }

    const infoEntity = details.mainId && details.mainEntity ? details.mainId : spoolIdEntityId;
    return html`
      <div class="spoolman-block" @click=${() => this._fireMoreInfo(infoEntity)}>
        <div class="spoolman-title">
          <div class="label"><ha-icon icon="mdi:spool"></ha-icon><span>${this._t('card.spoolman')}</span></div>
          <div class="value">ID ${details.spoolId}</div>
        </div>
        <div class="spoolman-filament">
          ${details.color ? html`<span class="filament-color" style=${`background:${details.color}`}></span>` : nothing}
          <span>${details.name}</span>
        </div>
        <div class="spoolman-remaining">
          <span>${this._t('card.remaining')}</span>
          <strong>${details.remaining}</strong>
        </div>
        ${!details.mainEntity || !details.nameEntity ? html`
          <div class="spoolman-hint">
            ${this._t('warning.missingEntity')}:
            ${!details.mainEntity ? details.mainId : details.nameId}
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderSpoolSelect(): TemplateResult | typeof nothing {
    const service = parseServiceReference(this._config.spoolman.set_active_spool_service);
    if (!service) return nothing;

    const options = discoverSpoolOptions(
      this.hass.states,
      this._config.spoolman.spool_entity_template,
      this._config.spoolman.id_entity_template,
      this._config.spoolman.filament_name_entity_template,
      this._config.spoolman.filament_material_entity_template,
      this._config.spoolman.vendor_name_entity_template,
    );
    if (options.length === 0) return nothing;

    const selectedId = this._displaySpoolId() ?? '';

    return html`
      <div class="spool-block">
        <div class="label"><ha-icon icon="mdi:spool"></ha-icon><span>${this._t('card.spoolSelection')}</span></div>
        <div class="spool-select-shell ${this._spoolSelectionBusy ? 'busy' : ''}">
          <select
            class="spool-select"
            .value=${live(selectedId)}
            ?disabled=${this._spoolSelectionBusy}
            aria-busy=${this._spoolSelectionBusy ? 'true' : 'false'}
            @change=${this._selectSpool}
          >
            ${selectedId
              ? nothing
              : html`<option value="" disabled .selected=${true}>—</option>`}
            ${options.map((option) => html`
              <option
                .value=${option.id}
                .selected=${isActiveSpoolOption(option.id, selectedId || undefined)}
              >${option.label}</option>
            `)}
          </select>
          ${this._spoolSelectionBusy
            ? html`<span class="spool-select-spinner" aria-hidden="true"></span>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderMacros(): TemplateResult | typeof nothing {
    if (this._config.macros.length === 0) return nothing;

    return html`
      <section class="macros">
        <div class="section-title">${this._t('card.macros')}</div>
        <div class="macro-grid">
          ${this._config.macros.map((macro, index) => html`
            <button class="macro-button" @click=${() => void this._callMacro(macro)}>
              ${macro.name || `Macro ${index + 1}`}
            </button>
          `)}
        </div>
      </section>
    `;
  }

  private _fireMoreInfo(entityId?: string): void {
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    }));
  }

  private _togglePower = async (): Promise<void> => {
    const entityId = this._config.entities.power_switch;
    if (!entityId || !this._entity(entityId)) return;
    try {
      await this.hass.callService('homeassistant', 'toggle', {}, { entity_id: entityId });
    } catch (error) {
      this._logError(error);
    }
  };

  private _selectSpool = async (event: Event): Promise<void> => {
    const select = event.currentTarget as HTMLSelectElement;
    const service = parseServiceReference(this._config.spoolman.set_active_spool_service);
    const verificationService = parseServiceReference(
      this._config.spoolman.get_active_spool_service,
    );
    const data = buildSpoolServiceData(select.value);
    if (!service || !data) return;

    const requestedSpoolId = select.value;
    this._selectionBaselineSpoolId = this._activeSpoolId();
    this._pendingSpoolId = requestedSpoolId;
    this._spoolSelectionBusy = true;

    try {
      await this.hass.callService(service.domain, service.service, data);

      if (verificationService) {
        const response = await this.hass.callWS<unknown>({
          type: 'call_service',
          domain: verificationService.domain,
          service: verificationService.service,
          service_data: { useragent: '3D-printer-status-card' },
          return_response: true,
        });
        const confirmedSpoolId = extractConfirmedSpoolId(response);
        if (!confirmedSpoolId) {
          throw new Error('Active spool verification returned no valid spool ID');
        }

        if (confirmedSpoolId === this._activeSpoolId()) {
          this._pendingSpoolId = undefined;
          this._selectionBaselineSpoolId = undefined;
        } else {
          this._pendingSpoolId = confirmedSpoolId;
        }

        if (confirmedSpoolId !== requestedSpoolId) {
          console.warn(
            '[3D printer status card]',
            `Moonraker confirmed spool ${confirmedSpoolId} instead of ${requestedSpoolId}`,
          );
        }
      }
    } catch (error) {
      this._pendingSpoolId = undefined;
      this._selectionBaselineSpoolId = undefined;
      this._logError(error);
    } finally {
      this._spoolSelectionBusy = false;
    }
  };

  private async _callMacro(macro: PrinterMacro): Promise<void> {
    try {
      if (macro.service) {
        const [domain, service] = macro.service.split('.', 2);
        if (!domain || !service) return;
        await this.hass.callService(domain, service, macro.service_data ?? {}, macro.target ?? {});
        return;
      }

      if (!macro.entity) return;
      const domain = macro.entity.split('.')[0];
      if (domain === 'button') {
        await this.hass.callService('button', 'press', {}, { entity_id: macro.entity });
      } else if (domain === 'script') {
        await this.hass.callService('script', 'turn_on', {}, { entity_id: macro.entity });
      } else {
        await this.hass.callService(domain, 'turn_on', {}, { entity_id: macro.entity });
      }
    } catch (error) {
      this._logError(error);
    }
  }

  private _logError(error: unknown): void {
    console.error('[3D printer status card]', error);
  }
}
