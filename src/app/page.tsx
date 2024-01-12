import pluralize from '@/helpers/pluralize';

import css from './page.module.scss';

export default function Home() {
  const range = new Date().getFullYear() - 2015;

  return (
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
  );
}
