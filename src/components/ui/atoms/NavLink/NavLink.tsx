'use client';

import { FC, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';

import css from './NavLink.module.scss';

interface INavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export const NavLink: FC<INavLinkProps> = ({ href, children, className = '' }) => {
  const isCurrentPage = href === usePathname();

  return (
    <>
      {
        isCurrentPage
          ? (
            <span data-disabled-link={isCurrentPage} className={`${css.navLink} ${css.disabled} ${className}`}>
              {children}
            </span>
          ) : (
            <Link className={`${css.navLink} ${className}`} href={href}>
              {children}
            </Link>
          )
      }
    </>
  );
};
