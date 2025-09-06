'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from '@/components/ui/Logo';

import css from './Header.module.scss';

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Logo />
      <nav className={css.navigation}>
        {/* Основная навигация */}
        <div className={css.mainNav}>
          <Link
            href="/cv"
            className={css.navLink}
            aria-current={pathname === '/cv' ? 'page' : undefined}
          >
            Резюме
          </Link>
          <Link
            href="/blog"
            className={css.navLink}
            aria-current={pathname.startsWith('/blog') ? 'page' : undefined}
          >
            Блог
          </Link>
          <Link
            href="/bookmarks"
            className={css.navLink}
            aria-current={pathname === '/bookmarks' ? 'page' : undefined}
          >
            Закладки
          </Link>
        </div>

      </nav>
    </header>
  );
};
