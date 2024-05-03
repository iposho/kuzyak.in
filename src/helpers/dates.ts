import { DateTime } from 'luxon';

/**
 * The format string for date.
 *
 * @type {string}
 */
export const FORMAT: string = 'dd.MM.yyyy';

/**
 * Formats the given Luxon date string into specified format and locale.
 *
 * @param {string} date - The Luxon date string to be formatted.
 * @param {string} [locale='ru'] - The locale to be used for formatting (default: 'ru').
 * @return {string} - The formatted date in the format 'LLLL yyyy'.
 */
export function formatLuxonDate(date: string, locale: string = 'ru'): string {
  return DateTime.fromFormat(date, FORMAT)
    .setLocale(locale)
    .toFormat('LLLL yyyy');
}

/**
 * Creates a date range string, representing either a single year or a range of years,
 * starting from the specified year up to the current year.
 *
 * @param {number|Date} [date=new Date().getFullYear()] - The year or date from which
 * the range starts. Defaults to the current year.
 * @param {string} [separator='–'] - The separator between years in the range. Defaults to a dash.
 * @returns {string} Returns a string representing the date range. If the specified year is the same
 * as the current year, it returns only that year.
 *
 * @example
 * // Returns "2023–2024" if the current year is 2023
 * createDateDiapason(2023);
 *
 * @example
 * // Returns "2023", if the specified year is the same as the current year
 * createDateDiapason(2023, '–');
 */
export default function createDateDiapason(
  date: number | Date = new Date().getFullYear(),
  separator: string = '–',
): string {
  const dateString = date.toString();
  const sinceYear = new Date(dateString).getFullYear();
  const currentYear = new Date().getFullYear();

  if (sinceYear === currentYear) {
    return sinceYear.toString();
  }

  return `${sinceYear}${separator}${currentYear}`;
}
