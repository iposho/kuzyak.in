'use client';

import { ReactElement } from 'react';
import { usePathname } from 'next/navigation';

import css from './Logo.module.scss';

interface CircleProps {
  className?: string;
  'aria-label'?: string;
  role?: string;
}

const Circle = ({
  className,
  'aria-label': ariaLabel,
  role,
} : CircleProps): ReactElement => (
  <div
    className={className}
    aria-label={ariaLabel}
    role={role}
  />
);

export const Logo = (): ReactElement => {
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (isMainPage) {
    return (
      <Circle
        className={css.logo}
        aria-label="Color changing circle"
        role="button"
      />
    );
  }

  return (
    <a
      className={css.link}
      href="/"
      aria-label="Go to homepage"
    >
      <Circle className={css.logo} />
    </a>
  );
};
