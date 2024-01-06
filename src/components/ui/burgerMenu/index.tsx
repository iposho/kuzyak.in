import { ReactElement } from 'react';
import css from './burgerMenu.module.scss';

interface BurgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function BurgerMenu({ isOpen, onClick }: BurgerMenuProps):ReactElement {
  return (
    <button
      aria-label="Burger menu"
      type="button"
      className={`${css.burgerIcon} ${isOpen ? css.open : ''}`}
      onClick={onClick}
    >
      <div />
    </button>
  );
}
