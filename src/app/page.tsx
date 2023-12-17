import Header from '@/app/components/layout/header';
import Social from '@/app/components/layout/social';
import Footer from '@/app/components/layout/footer';

import css from './styles/page.module.scss';

export default function Home() {
  return (
    <div className={css.home}>
      <Header />
      <main className={css.main}>
        <div className={css.description}>
          <p>
            Я фронтенд-разработчик, а еще тимлид и руководитель направления. В коммерческой разработке с 2015 года.
          </p>
          <p>
            Люблю создавать сложные веб-сайты и приложения, а также нанимать, обучать и развивать людей. Подробнее&nbsp;— в
            {' '}
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
