'use client';

import { useState } from 'react';
import css from './NewsletterSignup.module.scss';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function NewsletterSignup({
  title = 'Подпишитесь на рассылку',
  description = 'Получайте новые статьи прямо на почту. Без спама, только полезный контент.',
  placeholder = 'Ваш email',
  buttonText = 'Подписаться',
  successMessage = 'Спасибо за подписку! Проверьте почту для подтверждения.',
  errorMessage = 'Произошла ошибка. Попробуйте еще раз.',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Пожалуйста, введите корректный email');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // Здесь можно интегрировать с сервисом рассылок (Mailchimp, ConvertKit, etc.)
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage(successMessage);
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage(errorMessage);
    }
  };

  return (
    <div className={css.newsletterSignup}>
      <div className={css.content}>
        <h3 className={css.title}>{title}</h3>
        <p className={css.description}>{description}</p>

        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className={css.input}
              disabled={status === 'loading'}
              required
            />
            <button
              type="submit"
              className={css.button}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? '⏳' : '📧'}
              {status === 'loading' ? 'Подписываем...' : buttonText}
            </button>
          </div>
        </form>

        {message && (
          <div className={`${css.message} ${css[status]}`}>
            {message}
          </div>
        )}

        <p className={css.privacy}>
          🔒 Мы уважаем вашу приватность. Отписаться можно в любое время.
        </p>
      </div>
    </div>
  );
}
