'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { Logo } from '@/components/ui/Logo';

import css from './Header.module.scss';

export const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isProduction = process.env.NODE_ENV === 'production';
  const showMenu = isProduction ? searchParams.get('menu') === 'true' : true;

  return (
    <header className={css.header}>
      <Logo />
      {showMenu && (
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
      )}
    </header>
  );
};
