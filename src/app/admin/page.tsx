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

  const posts = await supabase.from('posts').select();

  return (
    <section className={css.adminPage}>
      <h3>Привет, %username%!</h3>
      <div>
        {
          session && <pre>{JSON.stringify(posts?.data, null, 2)}</pre>
        }
      </div>
    </section>
  );
}
