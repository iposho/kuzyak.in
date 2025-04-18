import { SKILLS_STRING } from '@/constants/skills';

import packageJson from '../../package.json';

// Metadata
export const METADATA_BASE = new URL('https://kuzyak.in');
export const METADATA_TITLE = 'Павел Кузякин';
export const METADATA_DESCRIPTION = 'Я фронтенд-разработчик. '
  + 'Люблю создавать сложные веб-сайты и приложения; нанимать, обучать и развивать людей.';
export const METADATA_KEYWORDS = SKILLS_STRING;

export const VERSION = packageJson?.version || '0.0.0';
export const REPOSITORY_URL = packageJson?.repository?.url || 'https://github.com/iposho/kuzyak.in';

export const COPYRIGHT_START_YEAR = 2014;
export const CURRENT_YEAR = new Date().getFullYear();
export const LAST_UPDATE_DATE = new Date(process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toISOString());
export const CONTACT_EMAIL = 'pavel@kuzyak.in';
