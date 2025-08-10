'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import css from './AuthForm.module.scss';

export const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (authError) {
        setError(authError.message);
      }
    } catch (err) {
      setError('Произошла ошибка при аутентификации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.authForm}>
      <h2>{isSignUp ? 'Регистрация' : 'Вход в админку'}</h2>
      
      {error && <div className={css.error}>{error}</div>}
      
      <div className={css.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          minLength={6}
        />
      </div>

      <button 
        type="submit" 
        className={css.submitButton}
        disabled={loading}
      >
        {loading ? 'Загрузка...' : (isSignUp ? 'Зарегистрироваться' : 'Войти')}
      </button>

      <button
        type="button"
        onClick={() => setIsSignUp(!isSignUp)}
        className={css.toggleButton}
        disabled={loading}
      >
        {isSignUp ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
      </button>
    </form>
  );
};