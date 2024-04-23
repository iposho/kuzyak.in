/**
 * Pluralizes the given value based on the variants provided.
 *
 * @param {number} value - The value to be pluralized.
 * @param {string[]} variants - The variants of the pluralized value.
 * It should have 3 elements, representing the singular, plural, and plural form for numbers between 10 and 20.
 * @return {string} - The pluralized value.
 */

interface IPluralizeArgs {
  value: number
  variants: string[]
}

export default function pluralize({ value, variants } : IPluralizeArgs): string {
  if (!Number.isInteger(value) || !Array.isArray(variants) || variants.length !== 3) {
    throw new Error('Invalid input');
  }

  const number = Math.abs(value) % 100;
  const remainder = number % 10;

  if (number > 10 && number < 20) return variants[2];
  if (remainder > 1 && remainder < 5) return variants[1];
  if (remainder === 1) return variants[0];

  return variants[2];
}
