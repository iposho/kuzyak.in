import { ReactElement } from 'react';

import Header from '@/app/components/layout/header';
import Social from '@/app/components/layout/social';
import Footer from '@/app/components/layout/footer';

import css from './styles/page.module.scss';

export default function Home():ReactElement {
  return (
    <>
      <Header />
      <main className={css.home}>
        <div className={css.description}>
          <h1>
            Привет, меня зовут Паша Кузякин.
          </h1>
          <h2>
            Я&nbsp;&mdash; фронтенд-разработчик.
          </h2>
          <p>
            А&nbsp;еще тимлид и&nbsp;руководитель направления.
          </p>
          <p>
            8 лет в&nbsp;коммерческой разработке.
          </p>
          <p>
            Люблю создавать сложные веб-сайты
            и&nbsp;приложения, нанимать, обучать и&nbsp;развивать людей.
          </p>
        </div>
        {/* <div className={css.description}> */}
        {/*  <p> */}
        {/*    Я&nbsp;фронтенд-разработчик, а&nbsp;еще тимлид и&nbsp;руководитель направления. */}
        {/*    В&nbsp;коммерческой разработке с&nbsp;2015 года. */}
        {/*  </p> */}
        {/*  <p> */}
        {/*    Люблю создавать сложные веб-сайты */}
        {/*    и&nbsp;приложения, а&nbsp;также нанимать, обучать и&nbsp;развивать людей. */}
        {/*  </p> */}
        {/*  <p> */}
        {/*    Подробнее&nbsp;— */}
        {/*    в&nbsp; */}
        {/*    <a href="https://drive.google.com/file/d/1w-mjHmk12TKkxUON1qABRV8dlLA4Yf77/view?usp=sharing">резюме</a> */}
        {/*    . */}
        {/*  </p> */}
        {/* </div> */}
        {/* <Social /> */}
      </main>
      <Footer />
    </>
  );
}
