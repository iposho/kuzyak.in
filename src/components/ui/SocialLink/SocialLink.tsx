import { ReactElement } from 'react';

import { SocialIcon } from '@/components/ui/SocialIcon';

import { ISocialLink } from '@/constants/social';

import css from './SocialLink.module.scss';

export const SocialLink = ({ id, label, link }: ISocialLink):ReactElement => (
  <a
    className={css.socialLink}
    href={link}
    title={label}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    id={`socialLink${id}`}
  >
    <SocialIcon label={label} link={link} />
  </a>
);
