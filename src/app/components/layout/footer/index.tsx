import { ReactElement } from 'react';

import css from './footer.module.scss';

export default function Footer():ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.copyrights}>
        <span>{`☕ 2014...${currentYear}`}</span>
      </div>
      <a
        className={css.emailLink}
        href="mailto:pavel@kuzyak.in"
      >
        pavel@kuzyak.in
      </a>
    </footer>
  );
}
