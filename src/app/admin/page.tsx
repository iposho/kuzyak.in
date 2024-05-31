import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Login } from '@/components/ui/Login';

import css from './page.module.scss';

export default async function AdminPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return <Login />;
  }

  const { data: { user } } = await supabase.auth.getUser();
  const name = user?.user_metadata.full_name || '%username%';

  return (
    <section className={css.adminPage}>
      <h3>{`Привет, ${name}!`}</h3>
    </section>
  );
}
