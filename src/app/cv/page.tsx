import type { Metadata } from 'next';

import { CV_LANGUAGES, CV_POSITIONS } from '@/constants/cv';

import { SKILLS } from '@/constants/skills';
import { Position } from '../../components/ui/Position';

import css from './page.module.scss';

export const metadata: Metadata = {
  title: 'Резюме',
};

export default function CV() {
  const dateTime = process.env.BUILD_DATE;
  const localeDate = dateTime ? new Date(dateTime).toLocaleDateString('ru-RU') : '';
  const time = dateTime ? new Date(dateTime).toLocaleTimeString('ru-RU') : '';

  return (
    <section className={css.cv}>
      <h1 className={css.pageTitle}>Резюме</h1>
      <div className={css.keywords}>
        <ul>
          {
            SKILLS.map((skill) => <li key={skill.id}>{skill.name}</li>)
          }
        </ul>
      </div>
      <div>
        <h2>Фронтенд-разработчик</h2>
        <p>
          Я&nbsp;опытный фронтенд-разработчик с&nbsp;экспертизой в&nbsp;JavaScript, TypeScript и&nbsp;React со всеми вытекающими.
        </p>
        <p>У&nbsp;меня есть успешный опыт управления командами и&nbsp;целым департаментом.</p>
        <p>Больше всего люблю работать в&nbsp;динамичных стартапах и&nbsp;небольших компаниях.</p>
      </div>
      <div className={css.experience}>
        <h2>Опыт</h2>
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
