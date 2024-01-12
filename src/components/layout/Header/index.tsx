'use client';

import { ReactElement } from 'react';

import Logo from '@/components/ui/Logo';
import Navigation from '@/components/layout/Navigation';

import css from './Header.module.scss';

export default function Header():ReactElement {
  return (
    <header className={css.header}>
      <Logo />
      <Navigation />
    </header>
  );
}
