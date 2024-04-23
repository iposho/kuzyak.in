import type { Metadata } from 'next';

import { METADATA_DESCRIPTION } from '@/constants/base';

import css from './page.module.scss';

export const metadata: Metadata = {
  title: 'Проекты',
  description: METADATA_DESCRIPTION,
};

async function getData() {
  const res = await fetch('https://api.github.com/users/iposho');

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return data;
}

export default async function Projects() {
  const data = await getData();

  console.log({ data });

  return (
    <section className={css.projects}>
      <h1>Проекты</h1>
      {
        data
        && (
          <div>
            {data.name}
          </div>
        )
      }
    </section>
  );
}
