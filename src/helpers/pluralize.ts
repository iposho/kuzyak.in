export default function pluralize(value: number, variants: string[]): string {
  const number = Math.abs(value) % 100;
  const remainder = number % 10;

  if (number > 10 && number < 20) return variants[2];
  if (remainder > 1 && remainder < 5) return variants[1];
  if (remainder === 1) return variants[0];

  return variants[2];
}
