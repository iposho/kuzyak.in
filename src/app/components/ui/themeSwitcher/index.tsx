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

  const isChecked = theme === 'light';
  const getTheme = isChecked ? 'dark' : 'light';

  return (
    <div
      className={css.switcher}
      title={`Switch to ${getTheme} theme`}
    >
      <DarkModeSwitch
        className={css.switch}
        checked={isChecked}
        moonColor="#C3C1A1"
        sunColor="#F28C38"
        onChange={() => setTheme(getTheme)}
        size={32}
      />
    </div>
  );
}
