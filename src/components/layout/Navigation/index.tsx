import { ReactElement, useState } from 'react';

import NAV_LINKS from '@/constants/links';
import BurgerMenu from '../../ui/BurgerMenu';

import NavLink from '../../ui/NavLink';
import css from './Navigation.module.scss';

export default function Navigation():ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`${css.navigation} ${isOpen ? css.open : ''}`}>
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
      <BurgerMenu
        isOpen={isOpen}
        onClick={toggleMenu}
      />
    </nav>
  );
}
