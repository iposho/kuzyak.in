import { ReactElement } from 'react';

import css from './BurgerMenu.module.scss';

interface BurgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function BurgerMenu({
  isOpen,
  onClick,
}: BurgerMenuProps): ReactElement {
  const burgerIconClasses = `${css.burgerIcon} ${isOpen ? css.open : ''}`;

  return (
    <button
      aria-label="Burger menu"
      type="button"
      className={burgerIconClasses}
      onClick={onClick}
    >
      <div />
    </button>
  );
}
