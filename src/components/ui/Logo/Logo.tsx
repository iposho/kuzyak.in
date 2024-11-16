'use client';

import { ReactElement, useState } from 'react';

import generateRandomColor from '@/helpers/generateRandomColor';

import css from './Logo.module.scss';

export const Logo = (): ReactElement => {
  const [bgColor, setBgColor] = useState('rgb(59,67,152)');

  const handleMouseEnter = () => {
    setBgColor(generateRandomColor());
  };

  return (
    <div
      className={css.logo}
      onMouseEnter={handleMouseEnter}
      style={{ backgroundColor: bgColor }}
    />
  );
};
