'use client';

import { FC, useEffect, useState } from 'react';

import css from './CookieConsent.module.scss';

export const CookieConsent: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={css.cookieConsent}>
      <div className={css.content}>
        <div>
          <p>
            Привет!
          </p>
          <p>
            Я, как и все, использую куки, чтобы собирать аналитику.
          </p>
          <p>
            Просто чтобы вы знали.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAccept}
          className={css.acceptButton}
        >
          Ок, не жалко!
        </button>
      </div>
    </div>
  );
};
