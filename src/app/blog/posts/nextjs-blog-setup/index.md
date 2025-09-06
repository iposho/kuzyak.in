---
title: "Настройка MDX-блога в Next.js"
description: "Пошаговое руководство по созданию блога с поддержкой Markdown и MDX в Next.js App Router"
date: "2024-01-15"
tags: ["nextjs", "mdx", "blog", "tutorial"]
author: "Pavel Kuzyakin"
coverImage: "/images/blog/nextjs-blog.jpg"
---

# Настройка MDX-блога в Next.js

В этой статье я расскажу, как создать полнофункциональный блог с поддержкой Markdown и MDX в Next.js с использованием App Router.

## Зачем нужен MDX?

MDX позволяет писать JSX прямо в Markdown файлах, что дает нам:

- **Гибкость**: Можем использовать React компоненты внутри постов
- **Интерактивность**: Добавлять интерактивные элементы в статьи
- **Переиспользование**: Создавать кастомные компоненты для контента

## Основные компоненты

### 1. Обработка файлов

Используем `gray-matter` для парсинга frontmatter:

```typescript
import matter from 'gray-matter';

const { data, content } = matter(fileContents);
```

### 2. Рендеринг MDX

Для рендеринга используем встроенную поддержку Next.js:

```typescript
import { useMDXComponents } from 'mdx/types';
```

## Структура проекта

```
content/
  posts/
    [slug]/
      index.md
      image.jpg
src/
  app/
    blog/
      page.tsx
      posts/
        [slug].mdx
  components/
    blog/
      PostCard.tsx
      TagList.tsx
  lib/
    blog-posts.ts
```

## Feature Toggle

Добавили возможность включать/выключать блог через переменную окружения:

```javascript
if (process.env.NEXT_PUBLIC_ENABLE_BLOG !== 'true') {
  notFound();
}
```

## Заключение

MDX-блог в Next.js предоставляет отличную гибкость для создания контента. Сочетание Markdown с React компонентами открывает множество возможностей для создания интерактивных статей.

> **Совет**: Используйте TypeScript для лучшей типизации и разработки.

Не забудьте настроить метаданные для SEO и добавить стилизацию под ваш дизайн!
