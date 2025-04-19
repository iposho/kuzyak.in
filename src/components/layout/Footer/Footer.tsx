'use client';

import { FC } from 'react';

import Image from 'next/image';

import {
  CURRENT_YEAR,
  VERSION,
  REPOSITORY_URL,
  COPYRIGHT_START_YEAR,
} from '@/constants/base';

import css from './Footer.module.scss';

export const Footer: FC = () => (
  <footer className={css.footer}>
    <div className={css.column}>
      <p className={css.copyright}>
        {`© ${COPYRIGHT_START_YEAR}...${CURRENT_YEAR}`}
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

      <a
        href="https://web.archive.org/web/20010406054522/http://mir.glasnet.ru/~awicon/"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/images/awicons/temafree.webp"
          alt="Tema Lebedev Free Website"
          className={css.banner}
          width={173}
          height={20}
        />
      </a>
    </div>
  </footer>
);
