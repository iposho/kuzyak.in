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
        <Image
          src="/images/signString.webp"
          alt="Signature: P. dictus magister"
          className={css.signature}
          width={220}
          height={54}
          priority={false}
        />
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
