import { NavLink } from '@/components/ui/NavLink';

import { NAV_LINKS } from '@/constants/navigation';

import css from './Navigation.module.scss';

export const Navigation = () => (
  <nav className={css.navigation}>
    <ul>
      {
        NAV_LINKS.map((link) => (
          <li key={link.id}>
            <NavLink href={link.href}>
              {link.title}
            </NavLink>
          </li>
        ))
      }
    </ul>
  </nav>
);
