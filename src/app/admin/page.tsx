import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Админка недоступна',
  description: 'Админка блога была удалена в пользу файловой системы',
};

export default function AdminPage() {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div>
        <h1>Админка недоступна</h1>
        <p>Блог теперь работает на основе Markdown файлов.</p>
        <p>Для добавления постов создавайте .md файлы в папке <code>content/posts/</code></p>
      </div>
    </div>
  );
}