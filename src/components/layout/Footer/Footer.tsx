'use client';

import { FC, useEffect } from 'react';

import {
  VERSION,
} from '@/constants/base';

import css from './Footer.module.scss';

const FOOTER_CONSTANTS = {
  COPYRIGHT: `© 2004...${new Date().getFullYear()}`,
  STATUS_MESSAGE: 'С любовью задеплоено на Vercel ❤️',
  VERSION_LOG: `%c🚀 App version ${VERSION}`,
  VERSION_LOG_STYLE: 'color: #4CAF50; font-weight: bold;',
} as const;

export const Footer: FC = () => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(FOOTER_CONSTANTS.VERSION_LOG, FOOTER_CONSTANTS.VERSION_LOG_STYLE);
  }, []);

  return (
    <footer className={css.footer}>
      <div className={css.column}>
        <div className={css.copyright}>
          <p>
            {FOOTER_CONSTANTS.COPYRIGHT}
          </p>
          <p className={css.status}>
            {FOOTER_CONSTANTS.STATUS_MESSAGE}
          </p>
        </div>

        {/* <a */}
        {/*   href="https://web.archive.org/web/20010406054522/http://mir.glasnet.ru/~awicon/" */}
        {/*   target="_blank" */}
        {/*   rel="noreferrer" */}
        {/* > */}
        {/*   <Image */}
        {/*     src="/images/awicons/temafree.webp" */}
        {/*     alt="Tema Lebedev Free Website" */}
        {/*     className={css.banner} */}
        {/*     width={100} */}
        {/*     height={12} */}
        {/*   /> */}
        {/* </a> */}
      </div>
    </footer>
  );
};
