import { CONTACT_EMAIL } from '@/constants/base';

import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaTelegram,
} from 'react-icons/fa';

import { VscMail } from 'react-icons/vsc';

export enum SocialPlatform {
  Email = 'Почта',
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
  icon: typeof FaGithub;
}

export const SOCIAL_LINKS: ISocialLink[] = [
  {
    id: 0,
    link: `mailto:${CONTACT_EMAIL}`,
    label: SocialPlatform.Email,
    icon: VscMail,
  },
  {
    id: 1,
    link: 'https://facebook.com/pashakuzyakin',
    label: SocialPlatform.Facebook,
    icon: FaFacebook,
  },
  {
    id: 2,
    link: 'https://www.linkedin.com/in/pavelkuzyakin',
    label: SocialPlatform.Linkedin,
    icon: FaLinkedin,
  },
  {
    id: 3,
    link: 'https://twitter.com/pavelkuzyakin',
    label: SocialPlatform.Twitter,
    icon: FaTwitter,
  },
  {
    id: 4,
    link: 'https://github.com/iposho',
    label: SocialPlatform.Github,
    icon: FaGithub,
  },
  {
    id: 5,
    link: 'https://telegram.me/mrPosho',
    label: SocialPlatform.Telegram,
    icon: FaTelegram,
  },
];
