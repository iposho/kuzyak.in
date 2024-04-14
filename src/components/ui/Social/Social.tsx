import { ReactElement } from 'react';

import { SocialLink } from '@/components/ui/SocialLink/SocialLink';

import { SOCIAL_LINKS, ISocialLink } from '@/constants/social';

import css from './Social.module.scss';

export const Social = ():ReactElement => (
  <div className={css.social}>
    <ul>
      {
        SOCIAL_LINKS.map(({
          id,
          label,
          link,
        }: ISocialLink) => (
          <li key={id}>
            <SocialLink
              label={label}
              link={link}
            />
          </li>
        ))
      }
    </ul>
  </div>
);
