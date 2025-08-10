'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthForm } from '@/components/admin/AuthForm';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { PostsList } from '@/components/admin/PostsList';
import { PostEditor } from '@/components/admin/PostEditor';
import { CategoriesManager } from '@/components/admin/CategoriesManager';
import { TagsManager } from '@/components/admin/TagsManager';
import { Post } from '@/lib/supabase';
import css from './page.module.scss';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('posts');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showPostEditor, setShowPostEditor] = useState(false);

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setShowPostEditor(true);
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowPostEditor(true);
  };

  const handleSavePost = () => {
    setShowPostEditor(false);
    setEditingPost(null);
  };

  const handleCancelEdit = () => {
    setShowPostEditor(false);
    setEditingPost(null);
  };

  if (loading) {
    return (
      <div className={css.adminPage}>
        <div>Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={css.adminPage}>
        <AuthForm />
      </div>
    );
  }

  const renderContent = () => {
    if (showPostEditor) {
      return (
        <PostEditor
          post={editingPost || undefined}
          onSave={handleSavePost}
          onCancel={handleCancelEdit}
        />
      );
    }

    switch (currentView) {
      case 'posts':
        return (
          <PostsList
            onEditPost={handleEditPost}
            onCreatePost={handleCreatePost}
          />
        );
      case 'categories':
        return <CategoriesManager />;
      case 'tags':
        return <TagsManager />;
      default:
        return (
          <PostsList
            onEditPost={handleEditPost}
            onCreatePost={handleCreatePost}
          />
        );
    }
  };

  return (
    <AdminLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderContent()}
    </AdminLayout>
  );
}