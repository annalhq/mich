export function getRadixColorScale(name: string): Record<string, string> {
  const scale: Record<string, string> = {};

  for (let i = 1; i <= 12; i++) {
    scale[i.toString()] = `var(--${name}-${i})`;
    scale[`a${i}`] = `var(--${name}-a${i})`;
  }

  return scale;
}
