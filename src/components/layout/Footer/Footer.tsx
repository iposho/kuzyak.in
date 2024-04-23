'use client';

import { ReactElement } from 'react';

import { Social } from '@/components/ui/Social';

import createDateDiapason from '@/helpers/dates';

import {
  COPYRIGHT_START_YEAR, CONTACT_EMAIL, VERSION, REPOSITORY_URL,
} from '@/constants/base';

import css from './Footer.module.scss';

export const Footer = (): ReactElement => (
  <footer className={css.footer}>
    <div>
      <p className={css.copyright}>
        {`© ${createDateDiapason(COPYRIGHT_START_YEAR, '...')}`}
      </p>
      <p className={css.email}>
        <a
          href={CONTACT_EMAIL}
        >
          {CONTACT_EMAIL.replace('mailto:', '')}
        </a>
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
    <Social />
  </footer>
);
