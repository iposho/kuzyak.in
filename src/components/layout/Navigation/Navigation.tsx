import css from './Navigation.module.scss';

export const Navigation = () => (
  <nav className={css.navigation}>
    <ul>
      <li><a href="/design/">Проекты</a></li>
      <li><a href="/music/">Заметки</a></li>
      <li><a href="/chess/">Шахматы</a></li>
    </ul>
  </nav>
);
