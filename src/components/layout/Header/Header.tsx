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
            href="/blog"
            className={css.navLink}
            aria-current={pathname.startsWith('/blog') ? 'page' : undefined}
          >
            Блог
          </Link>
        </div>

        {/* Поднавигация для блога */}
        {pathname.startsWith('/blog') && (
          <div className={css.subNav}>
            <Link
              href="/blog"
              className={css.subNavLink}
              aria-current={pathname === '/blog' ? 'page' : undefined}
            >
              Главная
            </Link>
            <Link
              href="/blog/all"
              className={css.subNavLink}
              aria-current={pathname === '/blog/all' ? 'page' : undefined}
            >
              Все посты
            </Link>
            <Link
              href="/blog/tags"
              className={css.subNavLink}
              aria-current={pathname === '/blog/tags' ? 'page' : undefined}
            >
              Теги
            </Link>
            <Link
              href="/blog/archive"
              className={css.subNavLink}
              aria-current={pathname === '/blog/archive' ? 'page' : undefined}
            >
              Архив
            </Link>
            <a
              href="/blog/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className={css.subNavLink}
            >
              RSS
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};
