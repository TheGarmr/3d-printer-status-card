export type FilamentIndicatorState = 'present' | 'missing';

export function filamentIndicatorState(
  rawState: string,
  presentState: string,
  missingState: string,
): FilamentIndicatorState | undefined {
  const state = rawState.trim().toLowerCase();
  if (!state) return undefined;

  if (state === presentState.trim().toLowerCase()) return 'present';
  if (state === missingState.trim().toLowerCase()) return 'missing';
  return undefined;
}
