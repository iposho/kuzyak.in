import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SOCIAL_LINKS, ISocialLink } from '@/constants/social';

import css from './Social.module.scss';

export default function Social(): ReactElement {
  return (
    <div className={css.social}>
      <ul className={css.links}>
        {SOCIAL_LINKS.map(({
          id,
          label,
          link,
          icon,
        }: ISocialLink) => (
          <li key={id}>
            <a aria-label={label} href={link}>
              <FontAwesomeIcon icon={icon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
