import pjson from '../../../../../package.json';

import css from './footer.module.scss';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.copyrights}>
        <span>{`© 2014...${currentYear}`}</span>
        <a
          className={css.emailLink}
          href="mailto:pavel@kuzyak.in"
        >
          pavel@kuzyak.in
        </a>
      </div>
      <div className={css.version}>{`☕ ${pjson.version}`}</div>
    </footer>
  );
}
