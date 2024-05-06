'use client';

import { ReactElement, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

import generateRandomColor from '@/helpers/generateRandomColor';

import css from './Logo.module.scss';

// Hack for using boolean values in environment variables
const isOpenToWork = JSON.parse(process.env.IS_OPEN_TO_WORK || 'false');

export const Logo = (): ReactElement => {
  const [bgColor, setBgColor] = useState('#00b2ff');

  const handleMouseEnter = () => {
    setBgColor(generateRandomColor());
  };

  const isMainPage = usePathname() === '/';
  const isCvPage = usePathname() === '/cv';

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

  const OpenToWork = (
    isOpenToWork
      ? (
        <span className={`${css.openToWork} ${css.showPanel}`}>
          #Open To&nbsp;Work
        </span>
      )
      : (
        <span className={css.openToWork}>
          Не ищу работу
        </span>
      )
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
      {
        isCvPage && OpenToWork
      }
    </div>
  );
};
