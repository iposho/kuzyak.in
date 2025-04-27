'use client';

import { FC, useEffect } from 'react';

import {
  VERSION,
} from '@/constants/base';

import css from './Footer.module.scss';

export const Footer: FC = () => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      `%c🚀 App version ${VERSION}`,
      'color: #4CAF50; font-weight: bold;',
    );
  }, []);

  return (
    <footer className={css.footer}>
      <div className={css.column}>
        <div className={css.copyright}>
          <p>
            © 2004...2025
          </p>
          <p className={css.status}>
            С&nbsp;любовью задеплоено на&nbsp;Vercel  ❤️
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
