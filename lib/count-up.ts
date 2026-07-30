export function parseCountValue(value: string): number {
  return Number(value.replace(/[^\d.-]/g, '')) || 0
}

export function isCountableValue(value: string): boolean {
  return /\d/.test(value) && Number.isFinite(parseCountValue(value))
}

export function formatCountValue(value: number): string {
  return Math.round(value).toLocaleString('en-US')
}
