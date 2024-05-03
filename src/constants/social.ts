export enum SocialPlatform {
  Facebook = 'Facebook',
  Linkedin = 'Linkedin',
  Twitter = 'Twitter',
  Github = 'Github',
  Telegram = 'Telegram',
}

export interface ISocialLink {
  id: number;
  link: string;
  label: SocialPlatform;
}

export const SOCIAL_LINKS: ISocialLink[] = [
  {
    id: 1,
    link: 'https://facebook.com/pashakuzyakin',
    label: SocialPlatform.Facebook,
  },
  {
    id: 2,
    link: 'https://www.linkedin.com/in/pavelkuzyakin/',
    label: SocialPlatform.Linkedin,
  },
  {
    id: 3,
    link: 'https://twitter.com/pavelkuzyakin',
    label: SocialPlatform.Twitter,
  },
  {
    id: 4,
    link: 'https://github.com/iposho',
    label: SocialPlatform.Github,
  },
  {
    id: 5,
    link: 'https://telegram.me/mrPosho',
    label: SocialPlatform.Telegram,
  },
];
