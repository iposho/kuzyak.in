'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/helpers/supabase/supabaseClient';

import { useRouter, usePathname } from 'next/navigation';

import Link from 'next/link';
import { NavLink } from '@/components/ui/atoms/NavLink';

import css from './Logout.module.scss';

interface LogoutProps {
  isAuth: boolean;
}

export function Logout({ isAuth }: LogoutProps) {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(false);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    if (pathname.startsWith('/admin')) {
      router.push('/admin');
    }

    router.refresh();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.altKey || event.metaKey) && event.key === 'l') {
        event.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isNotAdminPage = pathname !== '/admin';

  return isAuth ? (
    <>
      <li>
        <NavLink className={css.settings} href="/admin">
          🛠️
        </NavLink>
      </li>
      <li>
        <button className={css.logout} type="button" onClick={handleSignOut}>
          🔓
        </button>
      </li>
    </>
  ) : (
    (isVisible && isNotAdminPage) && (
      <li>
        <Link
          className={css.login}
          href="/admin"
        >
          🔒
        </Link>
      </li>
    )
  );
}
