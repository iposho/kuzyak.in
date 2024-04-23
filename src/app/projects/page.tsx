import type { Metadata } from 'next';

import { METADATA_DESCRIPTION } from '@/constants/base';
import css from './page.module.scss';

export const metadata: Metadata = {
  title: 'Проекты',
  description: METADATA_DESCRIPTION,
};

async function getData() {
  const res = await fetch('https://api.github.com/users/iposho/repos?type=public&sort=updated&per_page=10');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  const data = await res.json();

  const pinnedProjects = data.filter((repo: any) => repo.pinned);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return pinnedProjects;
}

export default async function Projects() {
  const data = await getData();

  return (
    <section className={css.projects}>
      <h1>Проекты</h1>
      {
        data && <div>{JSON.stringify(data)}</div>
      }
    </section>
  );
}
