'use client';

import { useState, useEffect } from 'react';

import styles from './TimeInYerevan.module.scss';

function TimeInYerevan() {
  const [time, setTime] = useState<string>('');
  const [timeDiff, setTimeDiff] = useState<string>('');

  useEffect(() => {
    // Helper function to handle Russian plural forms
    const pluralize = (n: number, forms: [string, string, string]): string => {
      const n1 = Math.abs(n) % 100;
      const n2 = n1 % 10;
      if (n1 > 10 && n1 < 20) return forms[2];
      if (n2 > 1 && n2 < 5) return forms[1];
      if (n2 === 1) return forms[0];
      return forms[2];
    };

    // Update time and time difference every second
    const updateTime = () => {
      const now = new Date();
      const yerevanTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Yerevan' }));
      setTime(yerevanTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));

      // Calculate time difference between local time and Yerevan time
      const diff = (yerevanTime.getHours() - now.getHours() + 24) % 24;
      if (diff === 0) {
        setTimeDiff('в том же часовом поясе');
      } else {
        setTimeDiff(`на ${diff} ${pluralize(diff, ['час', 'часа', 'часов'])} ${diff > 12 ? 'раньше' : 'позже'}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.time}>
      {timeDiff && (
        <>
          <span>
            Сейчас в Ереване
            {' '}
            {time}
            {' '}
            (GMT+4)
          </span>
          <span className={styles.timeDiff}>
            (
            {timeDiff}
            )
          </span>
        </>
      )}
    </div>
  );
}

export { TimeInYerevan };
