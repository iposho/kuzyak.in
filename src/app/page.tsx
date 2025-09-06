'use client';

import { SOCIAL_LINKS } from '@/constants/social';
import { GraphLogicIcon } from '@/components/ui/GraphLogicIcon';
import { useBodyClass } from '@/hooks/useBodyClass';

import { getExperienceYears } from '@/utils/getExperienceYears';

import styles from './page.module.scss';

export default function Home() {
  // Добавляем класс для показа фонового изображения только на главной странице
  useBodyClass('home-page');

  return (
    <>
      <section className={styles.section}>
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
          <a href="https://graphlogic.ai" className={styles.externalLink}>
            Графлоджике
            <GraphLogicIcon />
          </a>
          .
        </p>
        <p>
          Люблю создавать сложные веб-сайты и&nbsp;приложения; руководить командами,
          нанимать, обучать и&nbsp;развивать людей.
        </p>
      </section>

      <section className={styles.section}>
        <h2 id="technologies">Технологии, с которыми дружу</h2>
        <p>
          React, TypeScript, Next.js, Tailwind, GraphQL, Supabase, Docker, Node.js
        </p>
      </section>

      <section className={styles.section}>
        <h2 id="contacts">На связи</h2>
        <ul className={styles.list}>
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
                className={styles.socialLink}
              >
                <Icon />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </section>

    </>
  );
}
