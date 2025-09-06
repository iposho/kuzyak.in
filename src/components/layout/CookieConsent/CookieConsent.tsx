'use client';

import { FC, useEffect, useState } from 'react';

import styles from './CookieConsent.module.scss';

export const CookieConsent: FC = () => {
  // State for controlling visibility and animation
  const [isVisible, setIsVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Check for existing consent on mount
  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookieConsent');
      const shouldShow = !consent && typeof window !== 'undefined';
      setIsVisible(shouldShow);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error checking cookie consent:', error);
      setHasError(true);
    }
  }, []);

  // Handle consent acceptance with animation
  const handleAccept = () => {
    try {
      setIsHiding(true);
      setTimeout(() => {
        try {
          localStorage.setItem('cookieConsent', 'true');
          setIsVisible(false);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error saving cookie consent:', error);
          setHasError(true);
        }
      }, 300); // Match animation duration
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in handleAccept:', error);
      setHasError(true);
    }
  };

  // Don't render if not visible or if there's an error
  if (!isVisible || hasError) {
    return null;
  }

  return (
    <div
      className={`${styles.cookieConsent} ${isHiding ? styles.hiding : ''}`}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.content}>
        <div>
          <p>
            Я должен вас предупредить, что использую куки для сбора аналитики.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAccept}
          className={styles.acceptButton}
          aria-label="Accept cookies"
        >
          🍪 Ок, не жалко!
        </button>
      </div>
    </div>
  );
};
