'use client';

import { ReactElement } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import css from './Logo.module.scss';

interface CircleProps {
  className?: string;
  'aria-label'?: string;
  role?: string;
  children?: React.ReactNode;
}

const Circle = ({
  className,
  'aria-label': ariaLabel,
  role,
  children,
} : CircleProps): ReactElement => (
  <div
    className={className}
    aria-label={ariaLabel}
    role={role}
  >
    {children}
  </div>
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
      <Circle className={css.logo}>
        <Image
          src="/images/face.webp"
          alt="Pavel Kuzyakin"
          width={40}
          height={40}
          className={css.faceImage}
        />
      </Circle>
    </a>
  );
};
