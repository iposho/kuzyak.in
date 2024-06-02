import { useState, useEffect } from 'react';
import { createClient } from '@/helpers/supabase/supabaseClient';

const useGetPosts = () => {
  const supabase = createClient();
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setCurrentUser(user);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchSession().catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error in fetchSession:', error);
    });
  }, [supabase.auth]);

  const getPosts = async (limit?: number) => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .limit(limit || 50);
    if (error) throw new Error(error.message);
    setPosts(data || []);
    return data;
  };

  const createPost = async (title: string, body: string) => {
    if (!currentUser) throw new Error('Session not found');
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title,
        body,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  };

  const updatePost = async (id: string, title: string, body: string) => {
    const { data, error } = await supabase
      .from('posts')
      .update({
        title,
        body,
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  };

  return {
    getPosts,
    updatePost,
    createPost,
    posts,
  };
};

export default useGetPosts;
