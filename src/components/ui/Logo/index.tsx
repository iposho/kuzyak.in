import { ReactElement, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import generateRandomColor from '@/helpers/generateRandomColor';

import css from './Logo.module.scss';

export default function Logo(): ReactElement {
  const [bgColor, setBgColor] = useState('#4682b4');

  const handleMouseEnter = () => {
    setBgColor(generateRandomColor());
  };

  const isMainPage = usePathname() === '/';

  const shouldShowHat = new Date() <= new Date('2024-01-14');

  const Avatar = (
    <>
      <Image
        src="/me.webp"
        alt="Павел Кузякин"
        width={64}
        height={64}
        className={css.avatar}
        priority
      />
      {
        shouldShowHat && (
          <Image
            className={css.hat}
            src="/hat.webp"
            width={44}
            height={44}
            alt=""
          />
        )
      }
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
}
