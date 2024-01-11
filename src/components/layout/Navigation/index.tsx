import { ReactElement, useState } from 'react';

import NAV_LINKS from '@/constants/links';

import BurgerMenu from '@/components/ui/BurgerMenu';
import NavLink from '@/components/ui/NavLink';

import css from './Navigation.module.scss';

export default function Navigation(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const renderNavLinks = () => NAV_LINKS.map(({ id, href, title }) => (
    <li key={id}>
      <NavLink href={href}>
        {title}
      </NavLink>
    </li>
  ));

  return (
    <nav className={`${css.navigation} ${isOpen ? css.open : ''}`}>
      <ul>
        {renderNavLinks()}
      </ul>
      <BurgerMenu
        isOpen={isOpen}
        onClick={toggleMenu}
      />
    </nav>
  );
}
