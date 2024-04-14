import { DateTime } from 'luxon';
import pluralize from '@/helpers/pluralize';

/**
 * The format string for date.
 *
 * @type {string}
 */
export const FORMAT = 'dd.MM.yyyy';

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

export default function createDateDiapason(
  date = new Date().getFullYear(),
  separator = '–',
) {
  const dateString = date.toString();
  const sinceYear = new Date(dateString).getFullYear();
  const currentYear = new Date().getFullYear();

  if (sinceYear === currentYear) {
    return sinceYear;
  }

  return `${sinceYear}${separator}${currentYear}`;
}

/**
 * Calculates the duration between two given dates.
 *
 * @param {string} startDate - The start date in the format 'YYYY-MM-DD'.
 * @param {string} endDate - The end date in the format 'YYYY-MM-DD'.
 * @param {string} separator - The separator between years and months.
 * @return {string} - The formatted duration in years and months.
 */
export function calculateDuration(
  startDate: string,
  endDate: string,
  separator: string = '',
): string {
  const end = DateTime.fromFormat(endDate, FORMAT);
  const start = DateTime.fromFormat(startDate, FORMAT);

  const diffInMonths = end.diff(start, ['years', 'months']);

  const { years, months } = diffInMonths.toObject();

  const formattedYears = years
    ? `${years} ${pluralize(years, ['год', 'года', 'лет'])} `
    : '';

  const formattedMonths = months
    ? `${Math.floor(months)} ${pluralize(Math.floor(months), [
      'месяц',
      'месяца',
      'месяцев',
    ])}`
    : '';

  return `${formattedYears}${separator}${formattedMonths}`;
}
