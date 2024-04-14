'use client';

import { ReactElement, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

import generateRandomColor from '@/helpers/generateRandomColor';

import css from './Logo.module.scss';

export const Logo = (): ReactElement => {
  const [bgColor, setBgColor] = useState('#00b2ff');

  const handleMouseEnter = () => {
    setBgColor(generateRandomColor());
  };

  const isMainPage = usePathname() === '/';

  const Avatar = (
    <>
      <Image
        src="/me.webp"
        alt="Павел Кузякин"
        width={80}
        height={80}
        className={css.avatar}
        priority
      />
    </>
  );

  return (
    <div
      className={css.logo}
      onMouseEnter={handleMouseEnter}
      style={{ backgroundColor: bgColor }}
    >
      {
        isMainPage
          ? Avatar
          : (
            <Link className={css.link} href="/">
              {Avatar}
            </Link>
          )
      }
    </div>
  );
};
