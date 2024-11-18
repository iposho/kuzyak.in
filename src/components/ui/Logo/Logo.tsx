'use client';

import { ReactElement, useState } from 'react';
import { usePathname } from 'next/navigation';

import generateRandomColor from '@/helpers/generateRandomColor';

import css from './Logo.module.scss';

interface CircleProps {
  backgroundColor: string;
  onMouseEnter: () => void;
}

const Circle = ({ backgroundColor, onMouseEnter }: CircleProps): ReactElement => (
  // eslint-disable-next-line jsx-a11y/interactive-supports-focus
  <div
    className={css.logo}
    onMouseEnter={onMouseEnter}
    style={{ backgroundColor }}
    aria-label="Color changing circle"
    role="button"
  />
);

export const Logo = (): ReactElement => {
  const [bgColor, setBgColor] = useState('rgb(59,67,152)');

  const handleMouseEnter = () => {
    setBgColor(generateRandomColor());
  };

  const pathname = usePathname();
  const isMainPage = pathname === '/';

  return (
    isMainPage
      ? (
        <Circle
          backgroundColor={bgColor}
          onMouseEnter={handleMouseEnter}
        />
      )
      : (
        <a className={css.link} href="/" aria-label="Go to homepage">
          <Circle
            backgroundColor={bgColor}
            onMouseEnter={handleMouseEnter}
          />
        </a>
      )
  );
};
