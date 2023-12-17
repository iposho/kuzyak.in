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
            Я фронтенд-разработчик c опытом руководства командами и направлением. В коммерческой разработке с 2015 года.
          </p>
          <p>
            Люблю создавать сложные веб-сайты и приложения, а также нанимать, обучать и развивать людей. Подробности — в
            {' '}
            <a href="https://drive.google.com/file/d/1w-mjHmk12TKkxUON1qABRV8dlLA4Yf77/view?usp=sharing">резюме</a>
            .
          </p>
        </div>
        <Social />
      </main>
      <div
        className={css.swu}
        title="We support Ukraine Help Provide Aid to Ukraine"
      >
        <a href="https://crisisrelief.un.org/t/ukraine">{' '}</a>
      </div>
      <Footer />
    </div>
  );
}
