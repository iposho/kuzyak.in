import { ReactElement } from 'react';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

import pluralize from '@/helpers/pluralize';
import css from '@/styles/page.module.scss';

export default function Home():ReactElement {
  const range = new Date().getFullYear() - 2015;

  return (
    <>
      <Header />
      <main className={css.home}>
        <div className={css.description}>
          <h1>
            Привет, меня зовут Паша Кузякин.
          </h1>
          <h2>
            Я&nbsp;&mdash; фронтенд-разработчик.
          </h2>
          <p>
            А&nbsp;еще тимлид и&nbsp;руководитель направления.
          </p>
          <p>
            {range}
            &nbsp;
            {pluralize(range, ['год', 'года', 'лет'])}
            {' '}
            в&nbsp;коммерческой разработке.
          </p>
          <p>
            Люблю создавать сложные веб-сайты
            и&nbsp;приложения, нанимать, обучать и&nbsp;развивать людей.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
