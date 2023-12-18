import { IconDefinition } from '@fortawesome/fontawesome-common-types';

import {
  faFacebook,
  faGithub,
  faLinkedin,
  faTelegram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

export interface ISocialLink {
  id: number;
  icon: IconDefinition;
  link: string;
  label: string;
}

export const SOCIAL_LINKS: ISocialLink[] = [
  {
    id: 1,
    icon: faFacebook,
    link: 'https://facebook.com/pashakuzyakin',
    label: 'Фейсбук',
  },
  {
    id: 2,
    icon: faLinkedin,
    link: 'https://www.linkedin.com/in/pavelkuzyakin/',
    label: 'Линкедин',
  },
  {
    id: 3,
    icon: faTwitter,
    link: 'https://twitter.com/pavelkuzyakin',
    label: 'Твиттер',
  },
  {
    id: 4,
    icon: faGithub,
    link: 'https://github.com/iposho',
    label: 'Гитхаб',
  },
  {
    id: 5,
    icon: faTelegram,
    link: 'https://t.me/mrPosho',
    label: 'Телеграм',
  },
];
