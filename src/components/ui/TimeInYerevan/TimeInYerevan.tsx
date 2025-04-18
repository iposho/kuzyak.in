import css from './TimeInYerevan.module.scss';

export function TimeInYerevan() {
  const now = new Date();
  const yerevanTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Yerevan' }));

  const hours = yerevanTime.getHours().toString().padStart(2, '0');
  const minutes = yerevanTime.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;

  // Вычисляем разницу во времени
  const userOffset = now.getTimezoneOffset();
  const yerevanOffset = -240; // GMT+4 в минутах
  const diff = (yerevanOffset - userOffset) / 60;

  let timeDiff = '';
  if (diff > 0) {
    timeDiff = `на ${diff} час${diff > 1 ? 'а' : ''} позже`;
  } else if (diff < 0) {
    timeDiff = `на ${Math.abs(diff)} час${Math.abs(diff) > 1 ? 'а' : ''} раньше`;
  } else {
    timeDiff = 'в том же часовом поясе';
  }

  return (
    <div className={css.time}>
      {timeDiff && (
        <>
          <span>
            Сейчас в Ереване
            {' '}
            {time}
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
