import { DateTime } from 'luxon';
import pluralize from '@/helpers/pluralize';

export const FORMAT = 'dd.MM.yyyy';

export function formatLuxonDate(date: string, locale = 'ru') {
  return DateTime.fromFormat(date, FORMAT).setLocale(locale).toFormat('LLLL yyyy');
}

export function calculateDuration(startDate: string, endDate: string) {
  const end = DateTime.fromFormat(endDate, FORMAT);
  const start = DateTime.fromFormat(startDate, FORMAT);

  const diffInMonths = end.diff(start, ['years', 'months']);

  const { years, months } = diffInMonths.toObject();

  const formattedYears = years
    ? `${years} ${pluralize(years, ['год', 'года', 'лет'])} `
    : '';

  const formattedMonths = months
    ? `${Math.floor(months)} ${pluralize(months, ['месяц', 'месяца', 'месяцев'])}`
    : '';

  return `${formattedYears}${formattedMonths}`;
}
