'use client';

import { FC } from 'react';

import css from './Footer.module.scss';

export const Footer: FC = () => (
  <footer className={css.footer}>
    <div className={css.copyright}>
      © 2014...2025
    </div>
  </footer>
);
