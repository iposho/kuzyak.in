import { ReactElement } from 'react';

import Image from 'next/image';

import { calculateDuration, formatLuxonDate } from '@/helpers/dates';

import css from './Position.module.scss';

export interface IPosition {
  company: string
  link?: string
  image: string
  startDate: string
  endDate: string
  title: string
  responsibilities?: string[]
}

const getDateString = (startDate: string, endDate: string): string => {
  const startDt = formatLuxonDate(startDate);
  const endDt = endDate ? formatLuxonDate(endDate) : '...';
  return `${startDt} — ${endDt}`;
};

const ImageTitle = ({
  title,
  link,
  image,
  company,
}: {
  title: string
  link: string
  image: string
  company: string
}): ReactElement => (
  <h3>
    {title}
    {', '}
    <a href={link}>
      <Image
        src={image}
        alt={title}
        width={16}
        height={16}
        className={css.icon}
      />
      {company}
    </a>
  </h3>
);

export function Position({
  company,
  link = '',
  image,
  startDate,
  endDate,
  title,
  responsibilities,
}: IPosition) {
  const duration = calculateDuration(startDate, endDate);
  const dateString = getDateString(startDate, endDate);

  return (
    <div className={css.position}>
      <ImageTitle title={title} link={link} image={image} company={company} />
      <div className={css.date}>
        <span className={css.range}>
          {dateString}
        </span>
        {' '}
        <span className={css.diff}>{duration}</span>
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
