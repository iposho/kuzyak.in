'use client';

import { SOCIAL_LINKS } from '@/constants/social';
import { TimeInYerevan } from '@/components/ui/TimeInYerevan';

import { RiMapPinRangeFill } from 'react-icons/ri';
// import { CurrentTrack } from '@/components/ui/CurrentTrack/CurrentTrack';

import { getExperienceYears } from '@/utils/getExperienceYears';

import css from './page.module.scss';

export default function Home() {
  return (
    <>
      <section className={css.section}>
        <h1>
          Привет, меня&nbsp;зовут Паша&nbsp;Кузякин.
        </h1>
        <p>
          Я&nbsp;фронтенд-разработчик с&nbsp;опытом
          {' '}
          {getExperienceYears()}
          .
        </p>
        <p>
          Работаю в
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
                {/* {label === 'Почта' ? 'pavel@kuzyak.in' : link.split('/').pop()} */}
                {label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={css.section}>
        <div id="location" className={css.location}>
          <div className={css.locationInfo}>
            <RiMapPinRangeFill
              className={css.locationIcon}
            />
            <div>Ереван, Армения</div>
          </div>
          <div className={css.timeInfo}>
            <TimeInYerevan />
          </div>
        </div>
      </section>

      {/* <section className={css.section}> */}
      {/*   <CurrentTrack /> */}
      {/* </section> */}
    </>
  );
}
