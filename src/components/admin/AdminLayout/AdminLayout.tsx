'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import css from './AdminLayout.module.scss';

interface AdminLayoutProps {
  children: ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
}

export const AdminLayout = ({ children, currentView, onViewChange }: AdminLayoutProps) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const navItems = [
    { id: 'posts', label: 'Посты', icon: '📝' },
    { id: 'categories', label: 'Категории', icon: '📁' },
    { id: 'tags', label: 'Теги', icon: '🏷️' },
  ];

  return (
    <div className={css.adminLayout}>
      <aside className={css.sidebar}>
        <div className={css.logo}>
          Админка блога
        </div>

        <nav>
          <ul className={css.nav}>
            {navItems.map(item => (
              <li key={item.id} className={css.navItem}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`${css.navLink} ${currentView === item.id ? css.active : ''}`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={css.userInfo}>
          <div className={css.userEmail}>
            {user?.email}
          </div>
          <button
            onClick={handleSignOut}
            className={css.signOutButton}
          >
            Выйти
          </button>
        </div>
      </aside>

      <main className={css.main}>
        <div className={css.container}>
          {children}
        </div>
      </main>
    </div>
  );
};