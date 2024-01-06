import { ReactElement, useState } from 'react';

import Link from 'next/link';

import BurgerMenu from '@/components/ui/burgerMenu';

import css from './navigation.module.scss';

export default function Navigation():ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`${css.navigation} ${isOpen ? css.open : ''}`}>
      <ul>
        <li>
          <Link href="/cv">
            Резюме
          </Link>
        </li>
        <li>
          <Link href="/projects">
            Проекты
          </Link>
        </li>
        <li>
          <Link href="/blog">
            Блог
          </Link>
        </li>
      </ul>
      <BurgerMenu
        isOpen={isOpen}
        onClick={toggleMenu}
      />
    </nav>
  );
}
