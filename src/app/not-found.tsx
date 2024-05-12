import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="notFound">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <Link href="/">На главную страницу</Link>
    </div>
  );
}
