import { createClient } from '@/helpers/supabase/supabaseServer';

import { Logout } from '@/components/ui/molecules/Position/Logout';

import { NAV_LINKS } from '@/constants/navigation';
import { NavLink } from '../../ui/atoms/NavLink';

import css from './Navigation.module.scss';

export const Navigation = async () => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAuth = !!user;

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
        <Logout isAuth={isAuth} />
      </ul>
    </nav>
  );
};
