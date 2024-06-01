import { Navigation } from '@/components/layout/Navigation';
import { Logo } from '@/components/ui/atoms/Logo';

import css from './Header.module.scss';

export const Header = () => (
  <header className={css.header}>
    <Logo />
    <Navigation />
  </header>
);
