'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { DarkModeSwitch } from 'react-toggle-dark-mode';

import css from './themeSwitcher.module.scss';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={css.switcher}>
      <DarkModeSwitch
        checked={theme === 'light'}
        moonColor="peru"
        sunColor="orange"
        onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        size={32}
      />
    </div>
  );
}
