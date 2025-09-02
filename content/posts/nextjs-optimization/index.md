---
title: "Оптимизация Next.js приложений"
date: "2024-01-20"
excerpt: "Секреты производительности Next.js: от Image Optimization до Server Components"
tags: ["Next.js", "Performance", "React", "Web Vitals"]
category: "Frontend"
author: "Паша Кузякин"
featured_image: "/images/brain.webp"
---

# Оптимизация Next.js приложений

Next.js предоставляет множество встроенных возможностей для оптимизации производительности. Рассмотрим основные техники.

## Image Optimization

Next.js автоматически оптимизирует изображения через компонент `Image`.

```jsx
import Image from 'next/image';

function OptimizedImage() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero image"
      width={800}
      height={600}
      priority // Для изображений выше сгиба
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

## Server Components

Server Components позволяют выполнять код на сервере, уменьшая размер клиентского бандла.

```jsx
// app/components/ServerComponent.jsx
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data');
  const posts = await data.json();

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

## Dynamic Imports

Используйте динамические импорты для code splitting.

```jsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Загрузка...</p>,
  ssr: false // Отключить SSR для клиентских компонентов
});

function App() {
  return (
    <div>
      <h1>Главная страница</h1>
      <HeavyComponent />
    </div>
  );
}
```

## Bundle Analyzer

Анализируйте размер бандла для выявления проблем.

```bash
npm install --save-dev @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ваша конфигурация
});
```

## Заключение

Правильная оптимизация Next.js приложений значительно улучшает пользовательский опыт и SEO показатели.
