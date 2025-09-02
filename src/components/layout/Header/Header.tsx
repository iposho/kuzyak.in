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
