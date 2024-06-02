import { createClient } from '@/helpers/supabase/supabaseServer';

export default async function Posts() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  console.log(user);

  return (
    <section>
      <h1>Posts</h1>
      <p>No posts available.</p>
    </section>
  );
}
