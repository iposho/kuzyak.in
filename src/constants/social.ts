export interface ISocialLink {
  id: number;
  link: string;
  label: 'Facebook' | 'Linkedin' | 'Twitter' | 'Github' | 'Telegram';
}

export const SOCIAL_LINKS: ISocialLink[] = [
  {
    id: 1,
    link: 'https://facebook.com/pashakuzyakin',
    label: 'Facebook',
  },
  {
    id: 2,
    link: 'https://www.linkedin.com/in/pavelkuzyakin/',
    label: 'Linkedin',
  },
  {
    id: 3,
    link: 'https://twitter.com/pavelkuzyakin',
    label: 'Twitter',
  },
  {
    id: 4,
    link: 'https://github.com/iposho',
    label: 'Github',
  },
  {
    id: 5,
    link: 'https://telegram.me/mrPosho',
    label: 'Telegram',
  },
];
