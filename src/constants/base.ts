import { SKILLS_STRING } from '@/constants/skills';

import packageJson from '../../package.json';

// Metadata
export const METADATA_BASE = new URL('https://kuzyak.in');
export const METADATA_TITLE = 'Павел Кузякин';
export const METADATA_ROLE = 'Фронтенд-разработчик';
export const METADATA_DESCRIPTION = 'Опытный фронтенд-разработчик с глубокой экспертизой в'
  + ' JavaScript, TypeScript и React. За плечами — успешный опыт управления командами'
  + ' и департаментом.';
export const METADATA_KEYWORDS = SKILLS_STRING;

export const OPEN_TO_WORK = false;
export const VERSION = packageJson?.version || '0.0.0';
export const REPOSITORY_URL = packageJson?.repository?.url || 'https://github.com/iposho/kuzyak.in';

export const COPYRIGHT_START_YEAR = 2014;
export const CONTACT_EMAIL = 'mailto:pavel@kuzyak.in';

export const YEREVAN_MAP_LINK = 'https://www.google.com/maps/d/u/0/edit?mid=1o6XutOdDJhFlKuMZUoBYcdsRjYXg65ew&usp=sharing';
