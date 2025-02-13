'use client';

import { ReactElement } from 'react';
import Link from 'next/link';

import createDateDiapason from '@/helpers/dates';
import { SOCIAL_LINKS } from '@/constants/social';

import {
  COPYRIGHT_START_YEAR,
  VERSION,
  REPOSITORY_URL,
} from '@/constants/base';

import css from './Footer.module.scss';

export const Footer = (): ReactElement => (
  <footer className={css.footer}>
    <div>
      <ul className={css.socialLinks}>
        {SOCIAL_LINKS.map(({
          id,
          link,
          label,
          icon: Icon,
        }) => (
          <li key={id}>
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={css.socialLink}
            >
              <Icon size={36} />
            </Link>
          </li>
        ))}
      </ul>
      <p className={css.copyright}>
        {`© ${createDateDiapason(COPYRIGHT_START_YEAR, '...')}`}
      </p>
      <p className={css.version}>
        <a
          href={REPOSITORY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          v.
          {VERSION}
        </a>
      </p>
    </div>
  </footer>
);
