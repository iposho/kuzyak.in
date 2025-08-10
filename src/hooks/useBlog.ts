'use client';

import { useState, useEffect } from 'react';
import { supabase, Post, Category, Tag } from '@/lib/supabase';

export const useBlog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [postsResult, categoriesResult, tagsResult] = await Promise.all([
        supabase
          .from('posts')
          .select(`
            *,
            category:categories(*),
            tags:post_tags(tag:tags(*))
          `)
          .order('created_at', { ascending: false }),
        supabase
          .from('categories')
          .select('*')
          .order('name'),
        supabase
          .from('tags')
          .select('*')
          .order('name')
      ]);

      if (postsResult.error) throw postsResult.error;
      if (categoriesResult.error) throw categoriesResult.error;
      if (tagsResult.error) throw tagsResult.error;

      // Transform posts data to include tags properly
      const transformedPosts = postsResult.data.map(post => ({
        ...post,
        tags: post.tags?.map((pt: any) => pt.tag) || []
      }));

      setPosts(transformedPosts);
      setCategories(categoriesResult.data);
      setTags(tagsResult.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Create post
  const createPost = async (postData: Partial<Post>, tagIds: string[] = []) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('User not authenticated');

      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert({
          ...postData,
          author_id: user.data.user.id,
          slug: generateSlug(postData.title || ''),
          published_at: postData.status === 'published' ? new Date().toISOString() : null
        })
        .select()
        .single();

      if (postError) throw postError;

      // Add tags
      if (tagIds.length > 0) {
        const { error: tagsError } = await supabase
          .from('post_tags')
          .insert(tagIds.map(tagId => ({ post_id: post.id, tag_id: tagId })));

        if (tagsError) throw tagsError;
      }

      await fetchData();
      return post;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create post');
    }
  };

  // Update post
  const updatePost = async (id: string, postData: Partial<Post>, tagIds: string[] = []) => {
    try {
      const updateData = {
        ...postData,
        slug: postData.title ? generateSlug(postData.title) : undefined,
        published_at: postData.status === 'published' && !postData.published_at 
          ? new Date().toISOString() 
          : postData.published_at
      };

      const { data: post, error: postError } = await supabase
        .from('posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (postError) throw postError;

      // Update tags
      await supabase.from('post_tags').delete().eq('post_id', id);
      
      if (tagIds.length > 0) {
        const { error: tagsError } = await supabase
          .from('post_tags')
          .insert(tagIds.map(tagId => ({ post_id: id, tag_id: tagId })));

        if (tagsError) throw tagsError;
      }

      await fetchData();
      return post;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update post');
    }
  };

  // Delete post
  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete post');
    }
  };

  // Create category
  const createCategory = async (categoryData: Partial<Category>) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert({
          ...categoryData,
          slug: generateSlug(categoryData.name || '')
        })
        .select()
        .single();

      if (error) throw error;
      await fetchData();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create category');
    }
  };

  // Create tag
  const createTag = async (tagData: Partial<Tag>) => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .insert({
          ...tagData,
          slug: generateSlug(tagData.name || '')
        })
        .select()
        .single();

      if (error) throw error;
      await fetchData();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create tag');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    posts,
    categories,
    tags,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    createCategory,
    createTag,
    refetch: fetchData
  };
};

// Helper function to generate slug
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};