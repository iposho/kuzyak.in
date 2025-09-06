'use client';

import { useEffect, useState } from 'react';

import { LAST_UPDATE_DATE } from '@/constants/base';

import { getTimeOfDay } from '@/utils/time';

import styles from './EasterEgg.module.scss';

/**
 * EasterEgg component - shows a hidden message when pressing 'n' or 'т' key
 * The message contains information about the last website update time
 */
export function EasterEgg() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Check both 'n' in English layout and 'т' in Russian layout
      if (e.key.toLowerCase() === 'n' || e.key.toLowerCase() === 'т') {
        setShowMessage((prev) => !prev);
      }
      // Close on Escape
      if (e.key === 'Escape') {
        setShowMessage(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!showMessage) return null;

  const formattedDate = LAST_UPDATE_DATE.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const timeOfDay = getTimeOfDay();

  return (
    <button
      onClick={() => setShowMessage(false)}
      type="button"
      className={styles.easterEgg}
      title="Нажмите 'n', 'т' или 'Esc' чтобы закрыть"
    >
      {`${timeOfDay.icon} Паша хуячит этот сайт ${timeOfDay.text} ${formattedDate}`}
    </button>
  );
}
