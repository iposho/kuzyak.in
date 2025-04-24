'use client';

import { FC, useEffect } from 'react';

import Image from 'next/image';

import {
  LAST_UPDATE_DATE,
  VERSION,
} from '@/constants/base';

import { formatDate } from '@/utils/formatDate';

import css from './Footer.module.scss';

export const Footer: FC = () => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      `%c🚀 Версия ${VERSION}`,
      'color: #4CAF50; font-weight: bold;',
    );
  }, []);

  return (
    <footer className={css.footer}>
      <div className={css.column}>
        <p className={css.copyright}>
          {formatDate(new Date(LAST_UPDATE_DATE))}
        </p>

        {/* <p className={css.version}>
          <a
            href={REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            v.
            {VERSION}
          </a>
        </p> */}

        <a
          href="https://web.archive.org/web/20010406054522/http://mir.glasnet.ru/~awicon/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/images/awicons/temafree.webp"
            alt="Tema Lebedev Free Website"
            className={css.banner}
            width={100}
            height={12}
          />
        </a>
      </div>
    </footer>
  );
};
