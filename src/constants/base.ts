import { SKILLS_STRING } from '@/constants/skills';

import packageJson from '../../package.json';

/**
 * Base website metadata
 */
export const METADATA = {
  BASE: new URL('https://kuzyak.in'),
  TITLE: 'Павел Кузякин',
  DESCRIPTION: 'Я фронтенд-разработчик. Люблю создавать сложные веб-сайты и приложения; нанимать, обучать и развивать людей.',
  KEYWORDS: SKILLS_STRING,
} as const;

/**
 * Application version from package.json
 */
export const VERSION: string = packageJson?.version || '0.0.0';

/**
 * Last website update date
 * Takes into account UTC+4 timezone
 */
export const LAST_UPDATE_DATE: Date = (() => {
  const buildDate = process.env.BUILD_DATE;
  if (!buildDate) {
    const now = new Date();
    now.setHours(now.getHours() + 4);
    return now;
  }
  const date = new Date(buildDate);
  return Number.isNaN(date.getTime()) ? new Date() : date;
})();

/**
 * Contact email
 */
export const CONTACT_EMAIL = 'pavel@kuzyak.in';
