import { ReactElement } from 'react';

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
  title: string;
  link: string;
  image: string;
  company: string;
}): ReactElement => (
  <h2>
    {title}
    {', '}
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
  </h2>
);

export default function Position({
  company,
  link = '',
  image,
  startDate,
  summary,
  endDate,
  title,
}: IPosition) {
  const duration = calculateDuration(startDate, endDate);
  const dateString = getDateString(startDate, endDate);

  return (
    <div className={css.position}>
      <ImageTitle title={title} link={link} image={image} company={company} />
      <div className={css.date}>
        <span className={css.range}><i>{dateString}</i></span>
        {' '}
        <span className={css.diff}>{duration}</span>
      </div>
      <div className={css.summary}>
        <p>{summary}</p>
      </div>
    </div>
  );
}
