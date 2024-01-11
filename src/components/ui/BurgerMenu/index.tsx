import { ReactElement } from 'react';

import css from './BurgerMenu.module.scss';

interface BurgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

function getBurgerIconClasses(isOpen: boolean) {
  return `${css.burgerIcon} ${isOpen ? css.open : ''}`;
}

export default function BurgerMenu({
  isOpen,
  onClick,
}: BurgerMenuProps): ReactElement {
  const burgerIconClasses = getBurgerIconClasses(isOpen);

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
