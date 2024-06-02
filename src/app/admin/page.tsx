import { createClient } from '@/helpers/supabase/supabaseServer';

import { Login } from '@/components/ui/molecules/Login';

import css from './page.module.scss';

export default async function AdminPage() {
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return <Login />;
  }

  const name = user.user_metadata.full_name;

  return (
    <section className={css.adminPage}>
      <h3>{`Привет, ${name}!`}</h3>
    </section>
  );
}
