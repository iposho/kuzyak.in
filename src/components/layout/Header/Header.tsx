import { Logo } from '@/components/ui/Logo';
import { Navigation } from '@/components/layout/Navigation';

import css from './Header.module.scss';

export const Header = () => (
  <header className={css.header}>
    <Logo />
    <Navigation />
  </header>
);
