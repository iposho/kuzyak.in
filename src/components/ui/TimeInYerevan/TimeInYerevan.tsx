import css from './TimeInYerevan.module.scss';

function pluralize(n: number, forms: [string, string, string]): string {
  const n1 = Math.abs(n) % 100;
  const n2 = n1 % 10;
  if (n1 > 10 && n1 < 20) return forms[2];
  if (n2 > 1 && n2 < 5) return forms[1];
  if (n2 === 1) return forms[0];
  return forms[2];
}

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
    timeDiff = `на ${diff} ${pluralize(diff, ['час', 'часа', 'часов'])} позже`;
  } else if (diff < 0) {
    timeDiff = `на ${Math.abs(diff)} ${pluralize(Math.abs(diff), ['час', 'часа', 'часов'])} раньше`;
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
