import { ReactElement } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SOCIAL_LINKS, ISocialLink } from '@/app/constants/social';

import css from './social.module.scss';

export default function Social():ReactElement {
  return (
    <div className={css.social}>
      <ul className={css.links}>
        {SOCIAL_LINKS.map((socialItem: ISocialLink) => (
          <li key={socialItem.id}>
            <a href={socialItem.link}>
              <FontAwesomeIcon icon={socialItem.icon} />
              {socialItem.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
