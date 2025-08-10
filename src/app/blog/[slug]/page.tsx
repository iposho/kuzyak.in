'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase, Post } from '@/lib/supabase';
import css from './page.module.scss';

export default function PostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('posts')
          .select(`
            *,
            category:categories(*),
            tags:post_tags(tag:tags(*))
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            setError('Пост не найден');
          } else {
            throw fetchError;
          }
          return;
        }

        // Transform post data to include tags properly
        const transformedPost = {
          ...data,
          tags: data.tags?.map((pt: any) => pt.tag) || []
        };

        setPost(transformedPost);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки поста');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={css.postPage}>
        <div className={css.loading}>Загрузка поста...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.postPage}>
        <Link href="/blog" className={css.backLink}>
          ← Назад к блогу
        </Link>
        {error === 'Пост не найден' ? (
          <div className={css.notFound}>
            <h2>Пост не найден</h2>
            <p>Возможно, пост был удален или перемещен</p>
          </div>
        ) : (
          <div className={css.error}>{error}</div>
        )}
      </div>
    );
  }

  if (!post) {
    return (
      <div className={css.postPage}>
        <div className={css.notFound}>
          <h2>Пост не найден</h2>
          <p>Возможно, пост был удален или перемещен</p>
        </div>
      </div>
    );
  }

  return (
    <div className={css.postPage}>
      <Link href="/blog" className={css.backLink}>
        ← Назад к блогу
      </Link>

      <article>
        <header className={css.postHeader}>
          <h1 className={css.postTitle}>{post.title}</h1>
          
          <div className={css.postMeta}>
            <div className={css.publishDate}>
              📅 {formatDate(post.published_at || post.created_at)}
            </div>
            {post.category && (
              <span className={css.category}>
                {post.category.name}
              </span>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className={css.postTags}>
              {post.tags.map(tag => (
                <Link
                  key={tag.id}
                  href={`/blog/tag/${tag.slug}`}
                  className={css.tag}
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}
        </header>

        <div className={css.postContent}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}