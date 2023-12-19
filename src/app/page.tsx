import { ReactElement } from 'react';

import Header from '@/app/components/layout/header';
import Social from '@/app/components/layout/social';
import Footer from '@/app/components/layout/footer';

import css from './styles/page.module.scss';

export default function Home():ReactElement {
  return (
    <div className={css.home}>
      <Header />
      <main className={css.main}>
        <div className={css.description}>
          <p>
            Я&nbsp;фронтенд-разработчик, а&nbsp;еще тимлид и&nbsp;руководитель направления.
            В&nbsp;коммерческой разработке с&nbsp;2015 года.
          </p>
          <p>
            Люблю создавать сложные веб-сайты
            и&nbsp;приложения, а&nbsp;также нанимать, обучать и&nbsp;развивать людей.
          </p>
          <p>
            Подробнее&nbsp;—
            в&nbsp;
            <a href="https://drive.google.com/file/d/1w-mjHmk12TKkxUON1qABRV8dlLA4Yf77/view?usp=sharing">резюме</a>
            .
          </p>
        </div>
        <Social />
      </main>
      <Footer />
    </div>
  );
}
