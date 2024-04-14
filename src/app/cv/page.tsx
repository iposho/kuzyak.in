import type { Metadata } from 'next';

import { Position } from '@/components/ui/Postion';

import CV_POSITIONS from '@/constants/cv';

import { SKILLS } from '@/constants/skills';
import css from './page.module.scss';

export const metadata: Metadata = {
  title: 'Curriculum vitae',
  description: 'Опытный фронтенд-разработчик с навыками HTML, CSS,'
    + ' JavaScript, TypeScript и React. Успешный опыт управления командой'
    + ' и стратегическим направлением проектов. Специализируюсь на работе в динамичных стартапах и небольших компаниях.',
};

export default function CV() {
  const updateDate = new Date();
  const dateTime = updateDate.toISOString();
  const localeDate = updateDate.toLocaleDateString('ru-RU');

  return (
    <section className={css.cv}>
      <h1>Curriculum vitae</h1>
      <div className={css.transcription}>/kəˌrɪk.jə.ləm ˈviː.taɪ/</div>
      <div className={css.about}>
        {/* <h2>В двух словах</h2> */}
        <p>
          Я опытный фронтенд-разработчик с экспертизой в JavaScript, TypeScript и React.
        </p>
        <p>
          У меня есть успешный опыт управления командой и целым направлением.
        </p>
        <p>
          Больше всего люблю работать в динамичных стартапах и небольших компаниях.
        </p>
      </div>
      <div className={css.experience}>
        <h2>Опыт в деталях</h2>
        {CV_POSITIONS.map((position) => (
          <Position key={position.id} {...position} />
        ))}
      </div>
      <div className={css.keywords}>
        <h2>Ключевые слова</h2>
        <ul>
          {
            SKILLS.map((skill) => <li key={skill.id}>{skill.name}</li>)
          }
        </ul>
      </div>
      <div className={css.updateDate}>
        Обновлено
        {' '}
        <time
          dateTime={dateTime}
        >
          {localeDate}
        </time>
      </div>
    </section>
  );
}
