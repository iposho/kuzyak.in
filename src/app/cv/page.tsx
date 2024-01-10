import CV_POSITIONS from '@/constants/cv';

import Position from '@/components/ui/Position';

import css from './cv.module.scss';

export default function Cv() {
  return (
    <main className={css.cv}>
      <section className={css.primary}>
        <div className={css.description}>
          <h2>В трех абзацах</h2>
          <p>
            Начинал с&nbsp;азов HTML и&nbsp;CSS и&nbsp;позиции верстальщика,
            в&nbsp;последствии, транзитом через изучение JQuery и&nbsp;ванильного JavaScript,
            повысил квалификацию до&nbsp;уровня полноценного фронтенд-разработчика и&nbsp;стал
            привлекаться к&nbsp;проектам на&nbsp;TypeScript, React и&nbsp;иногда Node.js.
          </p>
          <p>
            Помимо опыта разработки, также имею опыт работы непосредственно с&nbsp;людьми,
            руководством как командой, так и&nbsp;направлением с&nbsp;вытекающими отсюда последствиями: составлением планов развития,
            наймом и&nbsp;онбордингом, обучением и&nbsp;так далее.
          </p>
          <p>
            Мне наиболее комфортно работать в&nbsp;динамичных стартапах и&nbsp;небольших компаниях.
            Я&nbsp;стремлюсь к&nbsp;возможности внести позитивные изменения без лишней бюрократии и&nbsp;достигнуть
            конкретных результатов в&nbsp;короткие сроки. Моя способность к&nbsp;установлению порядка и&nbsp;организации процессов,
            опыт найма, а&nbsp;также врожденное обаяние
            с&nbsp;отменным чувством юмора позволяют мне эффективно влиять на&nbsp;рабочую обстановку.
          </p>
        </div>
        <div className={css.experience}>
          <h2>Опыт работы</h2>
          {
            CV_POSITIONS.map((position) => (
              <Position
                key={position.id}
                {...position}
              />
            ))
          }
        </div>
      </section>
    </main>
  );
}
