'use client';

import { FC } from 'react';
import { CURRENT_YEAR, VERSION, REPOSITORY_URL } from '@/constants/base';

import css from './Footer.module.scss';

export const Footer: FC = () => (
  <footer className={css.footer}>
    <div className={css.copyright}>
      <p className={css.copyright}>
        © 2014...
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
