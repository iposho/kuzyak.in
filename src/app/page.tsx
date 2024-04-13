import css from './page.module.scss';

export default function Home() {
  return (
    <>
      <section className={css.description}>
        <h1>
          👋 Привет, меня зовут Паша&nbsp;Кузякин.
        </h1>
        <p>
          Я&nbsp;фронтенд-разработчик, иногда&nbsp;&mdash; тимлид и&nbsp;руководитель.
        </p>
        <p>В&nbsp;коммерческой разработке с&nbsp;2015 года.</p>
        <p>
          Люблю создавать сложные веб-сайты и&nbsp;приложения, нанимать, обучать и&nbsp;развивать людей.
        </p>
      </section>
    </>
  );
}
