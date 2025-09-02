'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Logo } from '@/components/ui/Logo';
import { isNavigationEnabled } from '@/utils/urlParams';

import css from './Header.module.scss';

export const Header = () => {
  const pathname = usePathname();
  const isProduction = process.env.NODE_ENV === 'production';
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    // Проверяем feature toggle при монтировании компонента
    setShowNavigation(isNavigationEnabled());
  }, []);

  // Показываем навигацию если:
  // 1. Не production режим (оригинальная логика)
  // 2. ИЛИ включен feature toggle через URL параметр ?nav=true
  const shouldShowNavigation = !isProduction || showNavigation;

  return (
    <header className={css.header}>
      <Logo />
      {shouldShowNavigation && (
        <nav className={css.navigation}>
          {/* Основная навигация */}
          <div className={css.mainNav}>
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
            </div>
          )}
        </nav>
      )}
    </header>
  );
};
