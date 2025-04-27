import { CONTACT_EMAIL } from '@/constants/base';

import {
  TbMail,
  TbBrandTelegram,
  TbBrandLinkedin,
  TbBrandFacebook,
  TbBrandTwitter,
  TbBrandGithub,
} from 'react-icons/tb';

export enum SocialPlatform {
  Email = 'Почта',
  Facebook = 'Фейсбук',
  Linkedin = 'Линкедин',
  Twitter = 'Твиттер',
  Github = 'Гитхаб',
  Telegram = 'Телеграм',
}

export interface ISocialLink {
  id: number;
  link: string;
  label: SocialPlatform;
  icon: typeof TbBrandGithub;
}

export const SOCIAL_LINKS: ISocialLink[] = [
  {
    id: 0,
    link: `mailto:${CONTACT_EMAIL}`,
    label: SocialPlatform.Email,
    icon: TbMail,
  },
  {
    id: 1,
    link: 'https://telegram.me/mrposho',
    label: SocialPlatform.Telegram,
    icon: TbBrandTelegram,
  },
  {
    id: 2,
    link: 'https://www.linkedin.com/in/pavelkuzyakin',
    label: SocialPlatform.Linkedin,
    icon: TbBrandLinkedin,
  },
  {
    id: 3,
    link: 'https://facebook.com/pashakuzyakin',
    label: SocialPlatform.Facebook,
    icon: TbBrandFacebook,
  },
  {
    id: 4,
    link: 'https://twitter.com/pavelkuzyakin',
    label: SocialPlatform.Twitter,
    icon: TbBrandTwitter,
  },
  {
    id: 5,
    link: 'https://github.com/iposho',
    label: SocialPlatform.Github,
    icon: TbBrandGithub,
  },
];
