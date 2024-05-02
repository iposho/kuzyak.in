import Image from 'next/image';

import { formatLuxonDate } from '@/helpers/dates';

import css from './Position.module.scss';

export interface IPosition {
  company: string
  link?: string
  image: string
  startDate: string
  endDate: string
  title: string
  responsibilities?: string[]
  width?: number
  height?: number
}

const getDateString = (startDate: string, endDate: string): string => {
  const startDt = formatLuxonDate(startDate);
  const endDt = endDate ? formatLuxonDate(endDate) : '...';
  return `${startDt} – ${endDt}`;
};

export function Position({
  company,
  link = '',
  image,
  startDate,
  endDate,
  title,
  responsibilities,
  width = 16,
  height = 16,
}: IPosition) {
  const dateString = getDateString(startDate, endDate);

  return (
    <div className={css.position}>
      <h3>
        <a href={link}>
          <Image
            src={image}
            alt={title}
            width={width}
            height={height}
            className={css.icon}
          />
          {company}
        </a>
        <span className={css.arrow}>→</span>
        <span className={css.title}>{title}</span>
      </h3>
      <div className={css.date}>
        <span>
          {dateString}
        </span>
      </div>
      <div className={css.responsibilities}>
        <ul>
          {responsibilities?.map((responsibility) => (
            <li key={responsibility}>{responsibility}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
