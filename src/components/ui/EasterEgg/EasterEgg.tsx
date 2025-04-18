// @ts-ignore

'use client';

import { useEffect, useState } from 'react';

import '@/styles/globals.scss';

export function EasterEgg() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Проверяем как 'n' в английской раскладке, так и 'т' в русской
      if (e.key.toLowerCase() === 'n' || e.key.toLowerCase() === 'т') {
        setShowMessage(true);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleClick = () => {
    setShowMessage(false);
  };

  if (!showMessage) return null;

  return (
    <button
      onClick={handleClick}
      type="button"
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--easter-egg-bg)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 9999,
        cursor: 'pointer',
        transition: 'opacity 0.2s ease',
        border: 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = '0.9';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = '1';
      }}
    >
      🌘 Паша хуячит этот сайт ночью 18 апреля 2025 года в 3:24.
    </button>
  );
} 