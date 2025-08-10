'use client';

import { useState } from 'react';
import { Post } from '@/lib/supabase';
import { useBlog } from '@/hooks/useBlog';
import css from './PostsList.module.scss';

interface PostsListProps {
  onEditPost: (post: Post) => void;
  onCreatePost: () => void;
}

export const PostsList = ({ onEditPost, onCreatePost }: PostsListProps) => {
  const { posts, categories, loading, error, deletePost } = useBlog();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredPosts = posts.filter(post => {
    const statusMatch = statusFilter === 'all' || post.status === statusFilter;
    const categoryMatch = categoryFilter === 'all' || post.category_id === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const handleDeletePost = async (post: Post) => {
    if (window.confirm(`Вы уверены, что хотите удалить пост "${post.title}"?`)) {
      try {
        await deletePost(post.id);
      } catch (err) {
        alert('Ошибка при удалении поста');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className={css.loading}>Загрузка постов...</div>;
  }

  return (
    <div className={css.postsList}>
      <div className={css.header}>
        <h2>Управление постами</h2>
        <button
          onClick={onCreatePost}
          className={css.createButton}
        >
          Создать пост
        </button>
      </div>

      {error && <div className={css.error}>{error}</div>}

      <div className={css.filters}>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Все статусы</option>
          <option value="draft">Черновики</option>
          <option value="published">Опубликованные</option>
          <option value="archived">Архив</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Все категории</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {filteredPosts.length === 0 ? (
        <div className={css.emptyState}>
          <h3>Постов не найдено</h3>
          <p>Создайте свой первый пост, чтобы начать</p>
        </div>
      ) : (
        <div className={css.postsGrid}>
          {filteredPosts.map(post => (
            <div key={post.id} className={css.postCard}>
              <div className={css.postHeader}>
                <div>
                  <h3 className={css.postTitle}>{post.title}</h3>
                  <div className={css.postMeta}>
                    <span className={`${css.status} ${css[post.status]}`}>
                      {post.status === 'draft' && 'Черновик'}
                      {post.status === 'published' && 'Опубликован'}
                      {post.status === 'archived' && 'Архив'}
                    </span>
                    {post.category && (
                      <span className={css.category}>
                        {post.category.name}
                      </span>
                    )}
                    <span>
                      {post.status === 'published' && post.published_at
                        ? `Опубликован ${formatDate(post.published_at)}`
                        : `Создан ${formatDate(post.created_at)}`
                      }
                    </span>
                  </div>
                </div>
                <div className={css.postActions}>
                  <button
                    onClick={() => onEditPost(post)}
                    className={`${css.actionButton} ${css.edit}`}
                    title="Редактировать"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeletePost(post)}
                    className={`${css.actionButton} ${css.delete}`}
                    title="Удалить"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {post.excerpt && (
                <p className={css.postExcerpt}>{post.excerpt}</p>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className={css.postTags}>
                  {post.tags.map(tag => (
                    <span key={tag.id} className={css.tag}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};