import { ReactElement } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SOCIAL_LINKS, ISocialLink } from '@/constants/social';

import css from './Social.module.scss';

export default function Social():ReactElement {
  return (
    <div className={css.social}>
      <ul className={css.links}>
        {SOCIAL_LINKS.map((socialItem: ISocialLink) => (
          <li key={socialItem.id}>
            <a aria-label={socialItem.label} href={socialItem.link}>
              <FontAwesomeIcon icon={socialItem.icon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
