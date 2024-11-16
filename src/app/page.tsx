import { CONTACT_EMAIL } from '@/constants/base';
import css from './page.module.scss';

export default function Home() {
  return (
    <>
      <section className={css.section}>
        <h1>
          Привет, меня зовут Паша&nbsp;Кузякин.
        </h1>
        <p>
          Я&nbsp;фронтенд-разработчик.
        </p>
        <p>
          Работаю в
          {' '}
          <a href="https://graphlogic.ai">
            Graphlogic.ai
          </a>
          .
        </p>
        <p>
          Люблю создавать сложные веб-сайты и&nbsp;приложения; нанимать, обучать и&nbsp;развивать людей.
        </p>
        <p>
          Всегда доступен по адресу
          {' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          .
        </p>
      </section>
    </>
  );
}
