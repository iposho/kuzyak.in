'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import css from './PostEditForm.module.scss';

interface Post {
  title: string;
  body: string;
}

interface PostEditFormProps {
  saveForm: (title: string, body: string) => Promise<void>;
  post?: Post | null;
}

export const PostEditForm: FC<PostEditFormProps> = ({ saveForm, post }) => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveForm(title, body);
  };

  const handleCancelClick = () => {
    router.push('/admin/posts');
  };

  const currentDate = new Date().toLocaleDateString('ru-RU');
  const currentTime = new Date().toLocaleTimeString('ru-RU');

  return (
    <form onSubmit={handleSubmit} className={css.postEditForm}>
      <div className={css.description}>
        <div className={css.type}>
          Сейчас
          {' '}
          <time suppressHydrationWarning>{`${currentTime} ${currentDate}`}</time>
          {' '}
          и мы
          {' '}
          <i>{post ? 'редактируем' : 'создаем новый'}</i>
          {' '}
          пост.
        </div>
      </div>

      <div className="formGroup">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="labelColumn" htmlFor="title">
          <input
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Название"
          />
        </label>
      </div>

      <div className="formGroup">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="labelColumn" htmlFor="body">
          <textarea
            id="body"
            className={css.textarea}
            placeholder="Содержимое"
            value={body}
            onChange={({ target }) => setBody(target.value)}
          />
        </label>
      </div>

      <div className={css.buttonsGroup}>
        <button type="submit">Опубликовать</button>
        <button className={css.cancel} type="button" onClick={handleCancelClick}>Отменить</button>
      </div>
    </form>
  );
};
