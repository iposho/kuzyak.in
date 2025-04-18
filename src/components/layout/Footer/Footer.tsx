'use client';

import { FC } from 'react';

import {
  CURRENT_YEAR,
  VERSION,
  REPOSITORY_URL,
  COPYRIGHT_START_YEAR,
} from '@/constants/base';

import css from './Footer.module.scss';

export const Footer: FC = () => (
  <footer className={css.footer}>
    <div className={css.copyright}>
      <p className={css.copyright}>
        ©
        {' '}
        {COPYRIGHT_START_YEAR}
        ...
        {CURRENT_YEAR}
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
