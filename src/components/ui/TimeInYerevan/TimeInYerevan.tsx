'use client';

import { useState, useEffect } from 'react';

import css from './TimeInYerevan.module.scss';

function pluralize(n: number, forms: [string, string, string]): string {
  const n1 = Math.abs(n) % 100;
  const n2 = n1 % 10;
  if (n1 > 10 && n1 < 20) return forms[2];
  if (n2 > 1 && n2 < 5) return forms[1];
  if (n2 === 1) return forms[0];
  return forms[2];
}

function TimeInYerevan() {
  const [time, setTime] = useState<string>('');
  const [timeDiff, setTimeDiff] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const yerevanTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Yerevan' }));

      const hours = yerevanTime.getHours().toString().padStart(2, '0');
      const minutes = yerevanTime.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);

      // Вычисляем разницу во времени
      const userOffset = now.getTimezoneOffset();
      const yerevanOffset = -240; // GMT+4 в минутах
      const diff = (yerevanOffset - userOffset) / 60;

      if (diff > 0) {
        setTimeDiff(`на ${diff} ${pluralize(diff, ['час', 'часа', 'часов'])} позже`);
      } else if (diff < 0) {
        setTimeDiff(`на ${Math.abs(diff)} ${pluralize(Math.abs(diff), ['час', 'часа', 'часов'])} раньше`);
      } else {
        setTimeDiff('в том же часовом поясе');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={css.time}>
      {timeDiff && (
        <>
          <span>
            Сейчас в Ереване
            {' '}
            {time}
            {' '}
            (GMT+4)
          </span>
          <span className={css.timeDiff}>
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
