import type { Metadata } from 'next';

import { METADATA_DESCRIPTION } from '@/constants/base';

import css from './page.module.scss';

export const metadata: Metadata = {
  title: 'Проекты',
  description: METADATA_DESCRIPTION,
};

export default function Projects() {
  return (
    <section className={css.projects}>
      <h1>Проекты</h1>
    </section>
  );
}
