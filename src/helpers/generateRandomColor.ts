/**
 * Generates a random color in hexadecimal format.
 *
 * @returns {string} The random color in hexadecimal format (e.g. "#a0522d").
 */

export default function generateRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
