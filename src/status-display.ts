export interface PrinterStatusDisplay {
  cssClass: string;
  translationKey?: string;
}

const ACTIVE_PRINT_STATES = new Set(['printing', 'busy', 'paused', 'pause']);

const STATUS_DISPLAYS: Record<string, PrinterStatusDisplay> = {
  printing: { cssClass: 'printing', translationKey: 'status.printing' },
  busy: { cssClass: 'printing', translationKey: 'status.printing' },
  complete: { cssClass: 'complete', translationKey: 'status.completed' },
  completed: { cssClass: 'complete', translationKey: 'status.completed' },
  finished: { cssClass: 'complete', translationKey: 'status.completed' },
  paused: { cssClass: 'paused', translationKey: 'status.paused' },
  pause: { cssClass: 'paused', translationKey: 'status.paused' },
  error: { cssClass: 'error', translationKey: 'status.error' },
  shutdown: { cssClass: 'error', translationKey: 'status.error' },
  idle: { cssClass: 'idle', translationKey: 'status.idle' },
};

export function printerStatusDisplay(status: string): PrinterStatusDisplay {
  return STATUS_DISPLAYS[status.trim().toLowerCase()] ?? { cssClass: 'idle' };
}

export function isActivePrintStatus(status: string | undefined): boolean {
  return ACTIVE_PRINT_STATES.has(String(status ?? '').trim().toLowerCase());
}
