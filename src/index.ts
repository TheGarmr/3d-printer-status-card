import { PrinterStatusCard } from './card';
import { localize } from './localize/localize';

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview: boolean;
      configurable: boolean;
    }>;
  }
}

if (!customElements.get('printer-status-card')) {
  customElements.define('printer-status-card', PrinterStatusCard);
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((card) => card.type === 'printer-status-card')) {
  window.customCards.push({
    type: 'printer-status-card',
    name: '3D printer status card',
    description: localize('en', 'common.description'),
    preview: true,
    configurable: true,
  });
}

console.info(
  '%c 3D PRINTER STATUS CARD %c v1.1.0 ',
  'color:#111;background:#ff9800;font-weight:700;',
  'color:#ff9800;background:#111;font-weight:700;',
);

export { PrinterStatusCard };
