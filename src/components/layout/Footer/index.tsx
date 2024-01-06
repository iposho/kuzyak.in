import { ReactElement } from 'react';

import Social from '../../ui/Social';

import css from './Footer.module.scss';

export default function Footer():ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div>
        <p
          className={css.copyright}
        >
          {`© 2014...${currentYear}`}
        </p>
        <p className={css.email}>
          <a
            href="mailto:pavel@kuzyak.in"
          >
            pavel@kuzyak.in
          </a>
        </p>
      </div>
      <div>
        <Social />
      </div>
    </footer>
  );
}
