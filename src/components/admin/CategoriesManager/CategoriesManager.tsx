'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Category } from '@/lib/supabase';
import { useBlog } from '@/hooks/useBlog';
import css from './CategoriesManager.module.scss';

interface CategoryFormData {
  name: string;
  description: string;
}

export const CategoriesManager = () => {
  const { categories, loading, error, createCategory } = useBlog();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormData>();

  const openCreateModal = () => {
    setEditingCategory(null);
    reset({ name: '', description: '' });
    setShowModal(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    reset({
      name: category.name,
      description: category.description || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    reset();
  };

  const onSubmit = async (data: CategoryFormData) => {
    setSubmitting(true);
    try {
      if (editingCategory) {
        // TODO: Implement update category
        console.log('Update category:', editingCategory.id, data);
      } else {
        await createCategory(data);
      }
      closeModal();
    } catch (err) {
      console.error('Error saving category:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className={css.loading}>Загрузка категорий...</div>;
  }

  return (
    <div className={css.categoriesManager}>
      <div className={css.header}>
        <h2>Управление категориями</h2>
        <button
          onClick={openCreateModal}
          className={css.createButton}
        >
          Создать категорию
        </button>
      </div>

      {error && <div className={css.error}>{error}</div>}

      {categories.length === 0 ? (
        <div className={css.emptyState}>
          <h3>Категорий пока нет</h3>
          <p>Создайте первую категорию для организации постов</p>
        </div>
      ) : (
        <div className={css.categoriesGrid}>
          {categories.map(category => (
            <div key={category.id} className={css.categoryCard}>
              <div className={css.categoryHeader}>
                <div>
                  <h3 className={css.categoryName}>{category.name}</h3>
                  <div className={css.categorySlug}>/{category.slug}</div>
                </div>
                <div className={css.categoryActions}>
                  <button
                    onClick={() => openEditModal(category)}
                    className={`${css.actionButton} ${css.edit}`}
                    title="Редактировать"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Удалить категорию "${category.name}"?`)) {
                        // TODO: Implement delete category
                        console.log('Delete category:', category.id);
                      }
                    }}
                    className={`${css.actionButton} ${css.delete}`}
                    title="Удалить"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              {category.description && (
                <p className={css.categoryDescription}>{category.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className={css.modal} onClick={closeModal}>
          <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={css.modalHeader}>
              <h3>
                {editingCategory ? 'Редактировать категорию' : 'Создать категорию'}
              </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={css.formGroup}>
                <label htmlFor="name">Название *</label>
                <input
                  id="name"
                  {...register('name', { required: 'Название обязательно' })}
                  disabled={submitting}
                />
                {errors.name && <span className={css.error}>{errors.name.message}</span>}
              </div>

              <div className={css.formGroup}>
                <label htmlFor="description">Описание</label>
                <textarea
                  id="description"
                  {...register('description')}
                  disabled={submitting}
                  placeholder="Краткое описание категории..."
                />
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