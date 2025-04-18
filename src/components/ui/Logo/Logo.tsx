'use client';

import { ReactElement } from 'react';
import { usePathname } from 'next/navigation';

import css from './Logo.module.scss';

const Circle = (): ReactElement => (
  <div
    className={css.logo}
    aria-label="Color changing circle"
    role="button"
  />
);

export const Logo = (): ReactElement => {
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  return (
    isMainPage
      ? <Circle />
      : (
        <a className={css.link} href="/" aria-label="Go to homepage">
          <Circle />
        </a>
      )
  );
};
