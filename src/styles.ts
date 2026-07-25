import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    display: block;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid var(--ha-card-border-color, var(--divider-color));
    border-radius: var(--ha-card-border-radius, 12px);
  }

  .card {
    padding: 16px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .header.compact {
    gap: 6px;
    margin-bottom: 0;
  }

  .header.compact .title {
    font-size: 17px;
  }

  .header.compact .status {
    padding: 4px 8px;
    font-size: 11px;
  }

  .header.compact .filament-indicator {
    width: 24px;
    height: 24px;
    min-width: 24px;
  }

  .header.compact .filament-indicator svg {
    width: 22px;
    height: 22px;
  }

  .title {
    flex: 1;
    min-width: 0;
    color: var(--primary-text-color);
    font-size: 20px;
    font-weight: 600;
    line-height: 1.2;
    overflow-wrap: anywhere;
  }

  .status {
    flex: 0 0 auto;
    border-radius: 999px;
    padding: 4px 10px;
    background: var(--secondary-background-color);
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .status.clickable,
  .row.clickable,
  .camera-card,
  .spoolman-block {
    cursor: pointer;
  }

  .status.printing { color: var(--success-color, #4caf50); }
  .status.complete { color: var(--info-color, #03a9f4); }
  .status.paused { color: var(--warning-color, #ff9800); }
  .status.error,
  .status.offline { color: var(--error-color, #db4437); }
  .status.powered-off,
  .status.idle { color: var(--secondary-text-color); }

  .filament-indicator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    min-width: 28px;
    padding: 2px;
    border: 0;
    color: var(--secondary-text-color);
    background: transparent;
    cursor: pointer;
    transition: transform 120ms ease, color 120ms ease;
  }

  .filament-indicator svg {
    width: 24px;
    height: 24px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .filament-indicator.present {
    color: var(--success-color, #4caf50);
    filter: drop-shadow(0 0 4px rgb(76 175 80 / 80%));
  }

  .filament-indicator.missing {
    color: var(--error-color, #db4437);
    filter: drop-shadow(0 0 4px rgb(219 68 55 / 85%));
  }

  .filament-indicator:hover {
    transform: scale(1.08);
  }

  .filament-indicator:focus-visible {
    border-radius: 5px;
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .power-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    min-width: 34px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    color: var(--secondary-text-color);
    background: var(--secondary-background-color);
    cursor: pointer;
    --mdc-icon-size: 19px;
  }

  .power-button.on {
    color: var(--text-primary-color, #fff);
    background: var(--success-color, #4caf50);
  }

  .power-button:hover,
  .macro-button:hover {
    filter: brightness(1.1);
  }

  .file {
    margin-bottom: 14px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    font-size: 14px;
    overflow-wrap: anywhere;
  }

  .camera-card {
    min-height: 120px;
    margin-bottom: 14px;
    overflow: hidden;
    border-radius: 14px;
    background: #111;
  }

  .camera-card > * {
    display: block;
  }

  .camera-warning,
  .spoolman-hint {
    padding: 10px 12px;
    color: var(--warning-color, #ff9800);
    background: var(--secondary-background-color);
    font-size: 12px;
  }

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }

  .row,
  .spool-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 36px;
    padding: 6px 0;
    border-bottom: 1px solid var(--divider-color);
  }

  .row.clickable:hover,
  .spoolman-block:hover {
    margin: 0 -4px;
    padding-right: 4px;
    padding-left: 4px;
    border-radius: 8px;
    background: var(--secondary-background-color);
  }

  .label {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    color: var(--secondary-text-color);
    font-size: 13px;
  }

  .label ha-icon {
    flex: 0 0 auto;
    --mdc-icon-size: 18px;
  }

  .value {
    color: var(--primary-text-color);
    font-size: 14px;
    font-weight: 500;
    text-align: right;
    overflow-wrap: anywhere;
  }

  .spoolman-block {
    display: block;
    padding: 10px 0;
  }

  .spool-block {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: stretch;
    justify-content: initial;
    gap: 8px;
    padding: 10px 0;
  }

  .spoolman-title,
  .spoolman-remaining {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .spoolman-filament {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px 0 6px;
    color: var(--primary-text-color);
    font-size: 14px;
    font-weight: 600;
  }

  .filament-color {
    width: 16px;
    height: 16px;
    flex: 0 0 auto;
    border: 1px solid var(--divider-color);
    border-radius: 999px;
  }

  .spoolman-remaining {
    color: var(--secondary-text-color);
    font-size: 13px;
  }

  .spool-select {
    width: 100%;
    max-width: none;
    min-width: 0;
    box-sizing: border-box;
    padding: 6px 8px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    overflow: hidden;
    color: var(--primary-text-color);
    background: var(--card-background-color, var(--ha-card-background));
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .spool-select-shell {
    position: relative;
    min-width: 0;
  }

  .spool-select-shell.busy .spool-select {
    padding-right: 34px;
    cursor: wait;
    opacity: .72;
  }

  .spool-select-spinner {
    position: absolute;
    top: 50%;
    right: 11px;
    width: 14px;
    height: 14px;
    box-sizing: border-box;
    transform: translateY(-50%);
    border: 2px solid color-mix(in srgb, var(--primary-text-color) 24%, transparent);
    border-top-color: var(--primary-text-color);
    border-radius: 999px;
    animation: spool-select-spin .7s linear infinite;
    pointer-events: none;
  }

  @keyframes spool-select-spin {
    to { transform: translateY(-50%) rotate(360deg); }
  }

  .macros {
    margin-top: 14px;
  }

  .section-title {
    margin-bottom: 8px;
    color: var(--secondary-text-color);
    font-size: 13px;
    font-weight: 600;
  }

  .printer-section-title {
    margin: 16px 0 2px;
  }

  .macro-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .macro-button {
    min-height: 38px;
    padding: 9px 10px;
    border: 0;
    border-radius: 10px;
    color: var(--primary-text-color);
    background: var(--secondary-background-color);
    cursor: pointer;
  }

  @media (max-width: 360px) {
    .card { padding: 12px; }
    .macro-grid { grid-template-columns: 1fr; }
  }
`;
