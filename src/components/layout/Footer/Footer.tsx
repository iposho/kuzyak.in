'use client';

import { FC, useEffect } from 'react';

import {
  VERSION,
  LAST_UPDATE_DATE,
} from '@/constants/base';

import styles from './Footer.module.scss';

const FOOTER_CONSTANTS = {
  COPYRIGHT: `© 2004...${new Date().getFullYear()}`,
  STATUS_MESSAGE: 'С любовью задеплоено на Vercel ❤️',
  VERSION_LOG: `%c🚀 App version ${VERSION}`,
  VERSION_LOG_STYLE: 'color: #4CAF50; font-weight: bold;',
  BUILD_DATE: `%c🏗️ Built on ${LAST_UPDATE_DATE.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  })}`,
  BUILD_DATE_STYLE: 'color: #2196F3; font-weight: bold;',
  SIGNATURE: `%c© ${new Date().getFullYear()} P. dictus magister`,
  SIGNATURE_STYLE: 'color: #9C27B0; font-style: italic; font-weight: bold;',
  LOAD_TIME: '%c⏱️ Page load time: ',
  LOAD_TIME_STYLE: 'color: #FF9800; font-weight: bold;',
} as const;

export const Footer: FC = () => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(FOOTER_CONSTANTS.VERSION_LOG, FOOTER_CONSTANTS.VERSION_LOG_STYLE);
    // eslint-disable-next-line no-console
    console.log(FOOTER_CONSTANTS.BUILD_DATE, FOOTER_CONSTANTS.BUILD_DATE_STYLE);
    // eslint-disable-next-line no-console
    console.log(
      `${FOOTER_CONSTANTS.LOAD_TIME}${(performance.now() / 1000).toFixed(2)}s`,
      FOOTER_CONSTANTS.LOAD_TIME_STYLE,
    );
    // eslint-disable-next-line no-console
    console.log('');
    // eslint-disable-next-line no-console
    console.log(FOOTER_CONSTANTS.SIGNATURE, FOOTER_CONSTANTS.SIGNATURE_STYLE);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <div className={styles.copyright}>
          <p>
            {FOOTER_CONSTANTS.COPYRIGHT}
          </p>
          <p className={styles.status}>
            {FOOTER_CONSTANTS.STATUS_MESSAGE}
          </p>
        </div>

      </div>
    </footer>
  );
};
