import { ReactElement } from 'react';

import Social from '../../ui/social';

import css from './footer.module.scss';

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
