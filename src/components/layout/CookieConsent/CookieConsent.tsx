'use client';

import { FC, useEffect, useState } from 'react';

import css from './CookieConsent.module.scss';

export const CookieConsent: FC = () => {
  // State for controlling visibility and animation
  const [isVisible, setIsVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  // Check for existing consent on mount
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  // Handle consent acceptance with animation
  const handleAccept = () => {
    setIsHiding(true);
    setTimeout(() => {
      localStorage.setItem('cookieConsent', 'true');
      setIsVisible(false);
    }, 300); // Match animation duration
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`${css.cookieConsent} ${isHiding ? css.hiding : ''}`}>
      <div className={css.content}>
        <div>
          <p>
            Я должен вас предупредить, что использую куки для сбора аналитики.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAccept}
          className={css.acceptButton}
        >
          🍪 Ок, не жалко!
        </button>
      </div>
    </div>
  );
};
