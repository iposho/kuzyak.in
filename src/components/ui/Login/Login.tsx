'use client';

import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import Image from 'next/image';

import githubSvg from '@/../public/social/github.svg';

import css from './Login.module.scss';

export function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000';

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${origin}/admin/callback`,
      },
    });

    if (error) {
      throw new Error(error.message);
    } else {
      router.refresh();
    }
  };

  return (
    <section className={css.login}>
      <h3>Заходи, раз пришел</h3>
      <button
        className={css.button}
        type="button"
        onClick={handleSignIn}
      >
        <Image src={githubSvg} alt="Github Logo" />
        Войти через Github
      </button>
    </section>
  );
}
