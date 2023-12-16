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
  return (
    <div className={css.social}>
      <ul className={css.links}>
        <li>
          <a href="https://facebook.com/pashakuzyakin">
            <FontAwesomeIcon icon={faFacebook} />
            Фейсбук
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/pavelkuzyakin/">
            <FontAwesomeIcon icon={faLinkedin} />
            Линкедин
          </a>
        </li>
        <li>
          <a href="https://twitter.com/pavelkuzyakin">
            <FontAwesomeIcon icon={faTwitter} />
            Твиттер
          </a>
        </li>
        <li>
          <a href="https://github.com/iposho">
            <FontAwesomeIcon icon={faGithub} />
            Гитхаб
          </a>
        </li>
        <li>
          <a href="https://t.me/pashakuzyakin">
            <FontAwesomeIcon icon={faTelegram} />
            Телеграм
          </a>
        </li>
      </ul>
    </div>
  );
}
