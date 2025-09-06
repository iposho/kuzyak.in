import {
  TbBrandTwitter,
  TbBrandGithub,
  TbBrandLinkedin,
  TbMail,
} from 'react-icons/tb';

export enum SocialPlatform {
  Email = 'Почта',
  Twitter = 'Твиттер',
  GitHub = 'GitHub',
  LinkedIn = 'LinkedIn',
}

export interface SocialLink {
  id: string;
  link: string;
  label: SocialPlatform;
  icon: React.ComponentType<{ className?: string }>;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'email',
    link: 'mailto:pavel@kuzyak.in',
    label: SocialPlatform.Email,
    icon: TbMail,
  },
  {
    id: 'twitter',
    link: 'https://twitter.com/iposho',
    label: SocialPlatform.Twitter,
    icon: TbBrandTwitter,
  },
  {
    id: 'github',
    link: 'https://github.com/iposho',
    label: SocialPlatform.GitHub,
    icon: TbBrandGithub,
  },
  {
    id: 'linkedin',
    link: 'https://linkedin.com/in/iposho',
    label: SocialPlatform.LinkedIn,
    icon: TbBrandLinkedin,
  },
];
