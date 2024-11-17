'use client';

import { ReactElement } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import createDateDiapason from '@/helpers/dates';

import {
  COPYRIGHT_START_YEAR,
  VERSION,
  REPOSITORY_URL,
} from '@/constants/base';

import css from './Footer.module.scss';

export const Footer = (): ReactElement => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      <footer className={css.footer}>
        <div>
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
      {
        isHomePage && (
          <Image
            className={css.face}
            src="/images/face-nobg.webp"
            width={200}
            height={200}
            alt=""
          />
        )
      }
    </>
  );
};
