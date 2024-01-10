import { ReactElement } from 'react';
import Social from '../../ui/Social';
import css from './Footer.module.scss';

const COPYRIGHT_START_YEAR = 2014;
const CONTACT_EMAIL = 'mailto:pavel@kuzyak.in';

export default function Footer(): ReactElement {
  const currentYear = new Date().getFullYear() - COPYRIGHT_START_YEAR;

  return (
    <footer className={css.footer}>
      <div>
        <p className={css.copyright}>
          {`© ${COPYRIGHT_START_YEAR}...${currentYear}`}
        </p>
        <p className={css.email}>
          <a href={CONTACT_EMAIL}>
            {CONTACT_EMAIL.replace('mailto:', '')}
          </a>
        </p>
      </div>
      <Social />
    </footer>
  );
}
