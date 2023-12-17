import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faTelegram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

import css from './social.module.scss';

export default function Social() {
  const socialData = [
    {
      id: 1, icon: faFacebook, link: 'https://facebook.com/pashakuzyakin', label: 'Фейсбук',
    },
    {
      id: 2, icon: faLinkedin, link: 'https://www.linkedin.com/in/pavelkuzyakin/', label: 'Линкедин',
    },
    {
      id: 3, icon: faTwitter, link: 'https://twitter.com/pavelkuzyakin', label: 'Твиттер',
    },
    {
      id: 4, icon: faGithub, link: 'https://github.com/iposho', label: 'Гитхаб',
    },
    {
      id: 5, icon: faTelegram, link: 'https://t.me/mrPosho', label: 'Телеграм',
    },
  ];

  return (
    <div className={css.social}>
      <ul className={css.links}>
        {socialData.map((socialItem) => (
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
