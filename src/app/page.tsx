import { SOCIAL_LINKS } from '@/constants/social';

import css from './page.module.scss';

export default function Home() {
  return (
    <>
      <section className={css.section}>
        <h1>
          Привет, меня&nbsp;зовут Паша&nbsp;Кузякин.
        </h1>
        <p>
          Я&nbsp;фронтенд-разработчик с&nbsp;десятилетним опытом. Работаю в
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

      <section className={css.section}>
        <div id="location" className={css.location}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={css.locationIcon}
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>Ереван, Армения (GMT+4)</span>
        </div>
      </section>
    </>
  );
}
