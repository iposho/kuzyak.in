import Image from 'next/image';

import css from './header.module.scss';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.image}>
        <Image
          src="/me.webp"
          alt="Павел Кузякин"
          width={150}
          height={150}
          className={css.logo}
          priority
        />
        {
          (new Date() <= new Date('2024-01-07'))
          && (
            <Image
              className={css.hat}
              src="/hat.webp"
              width={120}
              height={120}
              alt=""
            />
          )
        }
      </div>
      <h1 className={css.title}>Павел Кузякин</h1>
    </header>
  );
}
