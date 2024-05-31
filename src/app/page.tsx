import { YEREVAN_MAP_LINK } from '@/constants/base';

import css from './page.module.scss';

export default async function Home() {
  return (
    <section className={css.description}>
      <h1>
        Привет 👋, меня зовут Паша&nbsp;Кузякин.
      </h1>
      <p>
        Я&nbsp;фронтенд-разработчик.
      </p>
      <p>В&nbsp;коммерческой разработке с&nbsp;2015 года.</p>
      <p>
        Люблю создавать сложные веб-сайты и&nbsp;приложения, нанимать, обучать и&nbsp;развивать людей.
      </p>
      <p>
        Живу в
        &nbsp;
        <a
          title="Карта интересных мест Еревана"
          href={YEREVAN_MAP_LINK}
        >
          🇦🇲&nbsp;Ереване
        </a>
        .
      </p>
    </section>
  );
}
