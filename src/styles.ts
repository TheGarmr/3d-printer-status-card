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

  .file.with-thumbnail {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px 8px 8px;
  }

  .file-thumbnail {
    width: 56px;
    height: 56px;
    flex: 0 0 auto;
    border-radius: 8px;
    object-fit: contain;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    cursor: zoom-in;
  }

  .file-name {
    min-width: 0;
  }

  .emergency-stop {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    min-height: 40px;
    margin-top: 14px;
    padding: 9px 12px;
    border: 1px solid var(--error-color, #db4437);
    border-radius: 10px;
    color: var(--error-color, #db4437);
    background: transparent;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 120ms ease, color 120ms ease;
    --mdc-icon-size: 20px;
  }

  .emergency-stop:hover {
    background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
  }

  .emergency-confirm {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px 12px;
    margin-top: 14px;
    padding: 8px 8px 8px 12px;
    border: 1px solid var(--error-color, #db4437);
    border-radius: 10px;
    background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
  }

  .emergency-confirm-text {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    color: var(--error-color, #db4437);
    font-weight: 600;
    --mdc-icon-size: 20px;
  }

  .emergency-confirm-actions {
    display: flex;
    gap: 8px;
    margin-left: auto;
  }

  .emergency-cancel,
  .emergency-confirm-button {
    min-height: 34px;
    padding: 6px 14px;
    border: 0;
    border-radius: 8px;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }

  .emergency-cancel {
    color: var(--primary-text-color);
    background: var(--secondary-background-color);
  }

  .emergency-confirm-button {
    color: var(--text-primary-color, #fff);
    background: var(--error-color, #db4437);
    transition: opacity 150ms ease;
  }

  .emergency-confirm-button:disabled {
    opacity: .4;
    cursor: default;
  }

  .emergency-stop:focus-visible,
  .emergency-cancel:focus-visible,
  .emergency-confirm-button:focus-visible {
    outline: 2px solid var(--error-color, #db4437);
    outline-offset: 2px;
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

  .progress-block {
    margin-bottom: 10px;
    padding: 10px 12px 12px;
    border-radius: 12px;
    background: var(--secondary-background-color);
    cursor: pointer;
  }

  .progress-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
  }

  .progress-meta {
    display: flex;
    align-items: baseline;
    gap: 10px;
    min-width: 0;
  }

  .progress-layer {
    color: var(--secondary-text-color);
    font-size: 12px;
    white-space: nowrap;
  }

  .progress-value {
    color: var(--primary-text-color);
    font-size: 16px;
    font-variant-numeric: tabular-nums;
  }

  .bar {
    position: relative;
    overflow: hidden;
    border-radius: 999px;
    background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
  }

  .bar-fill {
    height: 100%;
    border-radius: inherit;
    background: var(--primary-color, #03a9f4);
    transition: width 400ms ease;
  }

  .progress-bar {
    height: 8px;
  }

  .progress-bar .bar-fill {
    background: var(--success-color, #4caf50);
  }

  .meter {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    flex: 1 1 auto;
    min-width: 0;
  }

  .meter-bar {
    flex: 0 1 120px;
    height: 6px;
  }

  .meter-bar.warning .bar-fill { background: var(--warning-color, #ff9800); }
  .meter-bar.critical .bar-fill { background: var(--error-color, #db4437); }

  .meter .value {
    min-width: 3.2em;
    font-variant-numeric: tabular-nums;
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

  .progress-block:hover {
    filter: brightness(1.05);
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

  .row.insufficient .label,
  .row.insufficient .value {
    color: var(--error-color, #db4437);
  }

  .value-note {
    margin-left: 6px;
    font-size: 12px;
    font-weight: 600;
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
