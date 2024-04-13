import { ReactElement } from 'react';

import {
  Facebook,
  Github,
  Linkedin,
  Telegram,
  Twitter,
} from '@/components/icons';

import css from './SocialLink.module.scss';

interface ISocialLink {
  label: string;
  link: string;
}

const renderIcon = (link: string):ReactElement | null => {
  const formattedLink = link.toLowerCase();

  switch (true) {
    case formattedLink.includes('facebook'):
      return <Facebook />;
    case formattedLink.includes('linkedin'):
      return <Linkedin />;
    case formattedLink.includes('github'):
      return <Github />;
    case formattedLink.includes('twitter'):
      return <Twitter />;
    case formattedLink.includes('t.me') || formattedLink.includes('telegram'):
      return <Telegram />;
    default:
      return null;
  }
};

export const SocialLink = ({ label, link }: ISocialLink):ReactElement => (
  <a
    className={css.socialLink}
    href={link}
    title={label}
    aria-label={label}
    target="_blank"
    rel="noreferrer"
  >
    {renderIcon(link)}
  </a>
);
