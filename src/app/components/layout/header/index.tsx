'use client';

import { ReactElement, useState } from 'react';

import Image from 'next/image';

import Navigation from '@/app/components/layout/navigation';

import generateRandomColor from '@/app/helpers/generateRandomColor';

import css from './header.module.scss';

export default function Header():ReactElement {
  const [bgColor, setBgColor] = useState('#4682b4');

  const handleMouseEnter = () => {
    setBgColor(generateRandomColor());
  };

  return (
    <header className={css.header}>
      <div
        className={css.logo}
        onMouseEnter={handleMouseEnter}
        style={{ backgroundColor: bgColor }}
      >
        <Image
          src="/me.webp"
          alt="Павел Кузякин"
          width={64}
          height={64}
          className={css.avatar}
          priority
        />
        {
          (new Date() <= new Date('2024-01-07'))
          && (
            <Image
              className={css.hat}
              src="/hat.webp"
              width={44}
              height={44}
              alt=""
            />
          )
        }
      </div>
      <Navigation />
    </header>
  );
}
