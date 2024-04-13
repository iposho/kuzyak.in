'use client';

import { FC, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';

import css from './NavLink.module.scss';

interface INavLinkProps {
  href: string;
  children: ReactNode;
}

export const NavLink: FC<INavLinkProps> = ({ href, children }) => {
  const isCurrentPage = href === usePathname();

  return (
    <>
      {isCurrentPage ? (
        <span className={`${css.navLink} ${css.disabled}`}>
          {children}
        </span>
      ) : (
        <Link className={css.navLink} href={href}>
          {children}
        </Link>
      )}
    </>
  );
};
