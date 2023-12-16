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
            Я фронтенд-разработчик и тимлид с 8-летним опытом разработки.
            Люблю создавать сложные веб-сайты и приложения.
          </p>
          <p>Специализируюсь на фронтенд-разработке и управлении командой.</p>
        </div>
        <Social />
      </main>
      <Footer />
    </div>
  );
}
