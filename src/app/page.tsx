import { SOCIAL_LINKS } from '@/constants/social';

import css from './page.module.scss';

export default function Home() {
  return (
    <>
      <section className={css.section}>
        <h1>
          Привет, меня зовут Паша&nbsp;Кузякин.
        </h1>
        <p>
          Я&nbsp;фронтенд-разработчик с более чем десятилетним стажем. Работаю в
          {' '}
          <a href="https://graphlogic.ai">
            Graphlogic
          </a>
          .
        </p>
        <p>
          Люблю создавать сложные веб-сайты и&nbsp;приложения; руководить командами,
          нанимать, обучать и&nbsp;развивать людей.
        </p>
      </section>

      <section className={css.section}>
        <h2 id="technologies">Технологии, с которыми дружу</h2>
        <p>
          React, TypeScript, Next.js, Tailwind, GraphQL, Supabase, Docker, Node.js
        </p>
      </section>

      <section className={css.section}>
        <h2 id="contacts">На связи</h2>
        <ul className={css.list}>
          {SOCIAL_LINKS.map(({
            id,
            link,
            label,
            icon: Icon,
          }) => (
            <li key={id}>
              <a
                href={link}
                target={label === 'Почта' ? undefined : '_blank'}
                rel={label === 'Почта' ? undefined : 'noreferrer'}
                className={css.socialLink}
              >
                <Icon />
                {label === 'Почта' ? 'pavel@kuzyak.in' : link.split('/').pop()}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
