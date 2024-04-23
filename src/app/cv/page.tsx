import type { Metadata } from 'next';

import { Position } from '@/components/ui/Postion';

import { CV_LANGUAGES, CV_POSITIONS } from '@/constants/cv';

import { SKILLS, SKILLS_STRING } from '@/constants/skills';

import css from './page.module.scss';

export const metadata: Metadata = {
  title: 'Curriculum vitae',
  description: 'Опытный фронтенд-разработчик с навыками HTML, CSS,'
    + ' JavaScript, TypeScript и React. Успешный опыт управления командой'
    + ' и стратегическим направлением проектов. Специализируюсь на работе в динамичных стартапах и небольших компаниях.',
  keywords: SKILLS_STRING,
};

export default function CV() {
  const dateTime = process.env.BUILD_DATE;
  const localeDate = dateTime ? new Date(dateTime).toLocaleDateString('ru-RU') : '';
  const time = dateTime ? new Date(dateTime).toLocaleTimeString('ru-RU') : '';

  return (
    <section className={css.cv}>
      <h1 className={css.pageTitle}>Curriculum vitae</h1>
      <h1 className={css.pageTitleForPrint}>Кузякин Павел Евгеньевич</h1>
      <div className={css.transcription}>/kəˌrɪk.jə.ləm ˈviː.taɪ/</div>
      <div className={css.about}>
        <p>
          Я&nbsp;опытный фронтенд-разработчик с&nbsp;экспертизой в&nbsp;JavaScript, TypeScript и&nbsp;React.
        </p>
        <p>У&nbsp;меня есть успешный опыт управления командой и&nbsp;целым направлением.</p>
        <p>Больше всего люблю работать в&nbsp;динамичных стартапах и&nbsp;небольших компаниях.</p>
      </div>
      <div className={css.experience}>
        <h2>Опыт в деталях</h2>
        <div className={css.positions}>
          {CV_POSITIONS.map((position) => (
            <Position key={position.id} {...position} />
          ))}
        </div>
      </div>
      <div className={css.languages}>
        <h2>Языки</h2>
        <ul>
          {
            CV_LANGUAGES.map(({
              id,
              lang,
              emoji,
              level,
            }) => <li key={id}>{`${emoji} ${lang} — ${level}`}</li>)
          }
        </ul>
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
          {' '}
          в
          {' '}
          {time}
        </time>
      </div>
    </section>
  );
}
