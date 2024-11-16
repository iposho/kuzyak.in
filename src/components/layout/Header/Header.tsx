import { Logo } from '@/components/ui/Logo';

import css from './Header.module.scss';

export const Header = () => (
  <header className={css.header}>
    <Logo />
  </header>
);
