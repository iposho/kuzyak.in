'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from '@/components/ui/Logo';

import css from './Header.module.scss';

export const Header = () => {
  const pathname = usePathname();
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <header className={css.header}>
      <Logo />
      {!isProduction && (
        <nav className={css.navigation}>
          <Link
            href="/"
            className={css.navLink}
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            Обо мне
          </Link>
          <Link
            href="/blog"
            className={css.navLink}
            aria-current={pathname.startsWith('/blog') ? 'page' : undefined}
          >
            Блог
          </Link>
        </nav>
      )}
    </header>
  );
};
