'use client';

import { ReactElement } from 'react';

import { Social } from '@/components/ui/Social';

import { COPYRIGHT_START_YEAR, CONTACT_EMAIL } from '@/constants/base';

import css from './Footer.module.scss';

export const Footer = (): ReactElement => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div>
        <p className={css.copyright}>
          {`☕ ${COPYRIGHT_START_YEAR}...${currentYear}`}
        </p>
        <p className={css.email}>
          <a href={CONTACT_EMAIL}>
            {CONTACT_EMAIL.replace('mailto:', '')}
          </a>
        </p>
      </div>
      <Social />
    </footer>
  );
};
