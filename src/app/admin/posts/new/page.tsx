'use client';

import { useRouter } from 'next/navigation';
import usePosts from '@/hooks/usePosts';

import { PostEditForm } from '@/components/ui/organisms/PostEditForm/PostEditForm';

import css from './page.module.scss';

export default function NewPostPage() {
  const router = useRouter();
  const { createPost } = usePosts();

  const handleSubmit = async (title: string, body: string) => {
    try {
      const { id } = await createPost(title, body);
      router.push(`/posts/${id}`);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <section className={css.postEditForm}>
      <PostEditForm saveForm={handleSubmit} />
    </section>
  );
}
