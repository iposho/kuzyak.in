import Image from 'next/image';

import css from './header.module.scss';

export default function Header() {
  return (
    <header className={css.header}>
      <Image
        src="/me.webp"
        alt="Павел Кузякин"
        width={100}
        height={100}
        className={css.logo}
        priority
      />
      <h1 className={css.title}>Павел Кузякин</h1>
    </header>
  );
}
