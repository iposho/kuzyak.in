'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Post, Category, Tag } from '@/lib/supabase';
import { useBlog } from '@/hooks/useBlog';
import css from './PostEditor.module.scss';

interface PostEditorProps {
  post?: Post;
  onSave: () => void;
  onCancel: () => void;
}

interface PostFormData {
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  category_id: string;
  status: 'draft' | 'published' | 'archived';
}

export const PostEditor = ({ post, onSave, onCancel }: PostEditorProps) => {
  const { categories, tags, createPost, updatePost } = useBlog();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<PostFormData>({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      excerpt: post?.excerpt || '',
      featured_image: post?.featured_image || '',
      category_id: post?.category_id || '',
      status: post?.status || 'draft',
    }
  });

  const watchedContent = watch('content');

  useEffect(() => {
    if (post?.tags) {
      setSelectedTags(post.tags.map(tag => tag.id));
    }
  }, [post]);

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const onSubmit = async (data: PostFormData) => {
    setLoading(true);
    setError(null);

    try {
      if (post) {
        await updatePost(post.id, data, selectedTags);
      } else {
        await createPost(data, selectedTags);
      }
      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.postEditor}>
      <div className={css.header}>
        <h2>{post ? 'Редактировать пост' : 'Создать пост'}</h2>
        <div className={css.actions}>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`${css.button} ${css.secondary}`}
          >
            {showPreview ? 'Редактор' : 'Превью'}
          </button>
        </div>
      </div>

      {error && <div className={css.error}>{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.formGrid}>
          <div className={css.mainColumn}>
            <div className={css.formGroup}>
              <label htmlFor="title">Заголовок *</label>
              <input
                id="title"
                {...register('title', { required: 'Заголовок обязателен' })}
                disabled={loading}
              />
              {errors.title && <span className={css.error}>{errors.title.message}</span>}
            </div>

            <div className={css.formGroup}>
              <label htmlFor="excerpt">Краткое описание</label>
              <textarea
                id="excerpt"
                rows={3}
                {...register('excerpt')}
                disabled={loading}
                placeholder="Краткое описание поста для превью..."
              />
            </div>

            {showPreview ? (
              <div className={css.preview}>
                <h3>Превью контента</h3>
                <div className={css.previewContent}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {watchedContent || 'Начните писать контент...'}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className={css.formGroup}>
                <label htmlFor="content">Контент (Markdown) *</label>
                <textarea
                  id="content"
                  {...register('content', { required: 'Контент обязателен' })}
                  disabled={loading}
                  placeholder="# Заголовок

Ваш контент в формате Markdown...

## Подзаголовок

- Список
- Элементов

```javascript
const code = 'example';
```"
                />
                {errors.content && <span className={css.error}>{errors.content.message}</span>}
              </div>
            )}
          </div>

          <div className={css.sideColumn}>
            <div className={css.formGroup}>
              <label htmlFor="status">Статус</label>
              <select
                id="status"
                {...register('status')}
                disabled={loading}
              >
                <option value="draft">Черновик</option>
                <option value="published">Опубликован</option>
                <option value="archived">Архив</option>
              </select>
            </div>

            <div className={css.formGroup}>
              <label htmlFor="category_id">Категория</label>
              <select
                id="category_id"
                {...register('category_id')}
                disabled={loading}
              >
                <option value="">Без категории</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={css.formGroup}>
              <label htmlFor="featured_image">Изображение (URL)</label>
              <input
                id="featured_image"
                type="url"
                {...register('featured_image')}
                disabled={loading}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className={css.formGroup}>
              <label>Теги</label>
              <div className={css.tagsContainer}>
                {tags.map(tag => (
                  <div
                    key={tag.id}
                    className={`${css.tag} ${selectedTags.includes(tag.id) ? css.selected : ''}`}
                    onClick={() => toggleTag(tag.id)}
                    role="button"
                    tabIndex={0}
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={css.buttonGroup}>
          <button
            type="button"
            onClick={onCancel}
            className={`${css.button} ${css.secondary}`}
            disabled={loading}
          >
            Отмена
          </button>
          <button
            type="submit"
            className={`${css.button} ${css.primary}`}
            disabled={loading}
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  );
};