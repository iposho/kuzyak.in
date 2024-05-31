import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { NavLink } from '@/components/ui/NavLink';
import { Logout } from '@/components/ui/Logout';

import { NAV_LINKS } from '@/constants/navigation';

import css from './Navigation.module.scss';

export const Navigation = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  return (
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
        <Logout isAuth={!!session} />
      </ul>
    </nav>
  );
};
