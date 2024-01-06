import { ReactElement } from 'react';

import Link from 'next/link';

import css from './navigation.module.scss';

export default function Navigation():ReactElement {
  return (
    <nav className={css.navigation}>
      <ul>
        <li>
          <Link href="/cv">
            Резюме
          </Link>
        </li>
        <li>
          <Link href="/projects">
            Проекты
          </Link>
        </li>
        <li>
          <Link href="/blog">
            Блог
          </Link>
        </li>
      </ul>
    </nav>
  );
}
