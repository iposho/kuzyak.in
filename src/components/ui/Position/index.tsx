import Image from 'next/image';

import { calculateDuration, formatLuxonDate } from '@/helpers/dates';

import css from './Postion.module.scss';

export interface IPosition {
  company: string;
  link?: string;
  image: string;
  startDate: string;
  endDate: string;
  title: string;
  summary: string;
}

export default function Position({
  company,
  link = '',
  image,
  startDate,
  summary,
  endDate,
  title,
}:IPosition) {
  const startDt = formatLuxonDate(startDate);
  const endDt = endDate ? formatLuxonDate(endDate) : '...';
  const dateString = `${startDt} — ${endDt}`;

  return (
    <div className={css.position}>
      <h2>{title}</h2>
      <div className={css.company}>
        <a href={link}>
          <Image
            src={image}
            alt={title}
            width={12}
            height={12}
            className={css.icon}
          />
          {company}
        </a>
        {', '}
        <span className={css.range}><i>{dateString}</i></span>
        {' '}
        <span className={css.diff}>{calculateDuration(startDate, endDate)}</span>
      </div>
      <div className={css.summary}>
        <p>{summary}</p>
      </div>
    </div>
  );
}
