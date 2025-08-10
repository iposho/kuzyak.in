'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Tag } from '@/lib/supabase';
import { useBlog } from '@/hooks/useBlog';
import css from './TagsManager.module.scss';

interface TagFormData {
  name: string;
}

export const TagsManager = () => {
  const { tags, loading, error, createTag } = useBlog();
  const [showModal, setShowModal] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TagFormData>();

  const openCreateModal = () => {
    setEditingTag(null);
    reset({ name: '' });
    setShowModal(true);
  };

  const openEditModal = (tag: Tag) => {
    setEditingTag(tag);
    reset({ name: tag.name });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTag(null);
    reset();
  };

  const onSubmit = async (data: TagFormData) => {
    setSubmitting(true);
    try {
      if (editingTag) {
        // TODO: Implement update tag
        console.log('Update tag:', editingTag.id, data);
      } else {
        await createTag(data);
      }
      closeModal();
    } catch (err) {
      console.error('Error saving tag:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className={css.loading}>Загрузка тегов...</div>;
  }

  return (
    <div className={css.tagsManager}>
      <div className={css.header}>
        <h2>Управление тегами</h2>
        <button
          onClick={openCreateModal}
          className={css.createButton}
        >
          Создать тег
        </button>
      </div>

      {error && <div className={css.error}>{error}</div>}

      {tags.length === 0 ? (
        <div className={css.emptyState}>
          <h3>Тегов пока нет</h3>
          <p>Создайте первый тег для организации контента</p>
        </div>
      ) : (
        <div className={css.tagsGrid}>
          {tags.map(tag => (
            <div key={tag.id} className={css.tagCard}>
              <div className={css.tagInfo}>
                <h3 className={css.tagName}>{tag.name}</h3>
                <div className={css.tagSlug}>#{tag.slug}</div>
              </div>
              <div className={css.tagActions}>
                <button
                  onClick={() => openEditModal(tag)}
                  className={`${css.actionButton} ${css.edit}`}
                  title="Редактировать"
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Удалить тег "${tag.name}"?`)) {
                      // TODO: Implement delete tag
                      console.log('Delete tag:', tag.id);
                    }
                  }}
                  className={`${css.actionButton} ${css.delete}`}
                  title="Удалить"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className={css.modal} onClick={closeModal}>
          <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={css.modalHeader}>
              <h3>
                {editingTag ? 'Редактировать тег' : 'Создать тег'}
              </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={css.formGroup}>
                <label htmlFor="name">Название *</label>
                <input
                  id="name"
                  {...register('name', { required: 'Название обязательно' })}
                  disabled={submitting}
                  placeholder="Например: JavaScript"
                />
                {errors.name && <span className={css.error}>{errors.name.message}</span>}
              </div>

              <div className={css.modalActions}>
                <button
                  type="button"
                  onClick={closeModal}
                  className={`${css.button} ${css.secondary}`}
                  disabled={submitting}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className={`${css.button} ${css.primary}`}
                  disabled={submitting}
                >
                  {submitting ? 'Сохранение...' : 'Сохранить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};