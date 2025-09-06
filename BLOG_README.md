# MDX Блог для Next.js

Полнофункциональный блог с поддержкой Markdown/MDX для Next.js App Router.

## 🚀 Возможности

- ✅ **Markdown/MDX поддержка** - пишите посты в Markdown с возможностью использования JSX
- ✅ **Статическая генерация** - все страницы генерируются статически (SSG)
- ✅ **Теги и категории** - организация постов по тегам
- ✅ **Пагинация** - удобная навигация по постам
- ✅ **SEO оптимизация** - метаданные и Open Graph теги
- ✅ **Feature Toggle** - возможность включать/выключать блог
- ✅ **Responsive дизайн** - адаптивная верстка
- ✅ **TypeScript** - полная типизация

## 📁 Структура проекта

```
src/
├── app/
│   └── blog/
│       ├── page.tsx              # Список всех постов
│       ├── [slug]/
│       │   └── page.tsx          # Страница отдельного поста
│       └── tags/
│           └── [tag]/
│               └── page.tsx      # Страница постов по тегу
├── components/
│   └── blog/
│       ├── MDXContent/           # Компонент для рендеринга MDX
│       ├── PostCard/             # Карточка поста
│       ├── TagList/              # Список тегов
│       └── Pagination/           # Пагинация
├── lib/
│   └── posts.ts                  # Утилиты для работы с постами
└── types/
    └── blog.ts                   # Типы для блога

content/
└── posts/
    ├── post-slug-1/
    │   ├── index.md              # Содержимое поста
    │   └── image.jpg             # Медиафайлы поста
    └── post-slug-2/
        ├── index.md
        └── video.mp4
```

## 🛠 Установка и настройка

### 1. Установка зависимостей

```bash
npm install gray-matter next-mdx-remote
```

### 2. Настройка переменных окружения

Добавьте в `.env.local`:

```bash
NEXT_PUBLIC_ENABLE_BLOG=true
```

### 3. Создание поста

1. Создайте папку в `content/posts/` с названием поста (slug)
2. Добавьте файл `index.md` с содержимым:

```markdown
---
title: "Заголовок поста"
description: "Описание поста для SEO"
date: "2024-01-15"
tags: ["nextjs", "react", "tutorial"]
author: "Ваше имя"
coverImage: "/images/blog/cover.jpg"  # Опционально
---

# Содержимое поста

Пишите здесь ваш контент в Markdown...
```

3. Добавьте медиафайлы в ту же папку (изображения, видео и т.д.)

## 📝 Формат постов

### Frontmatter

Каждый пост должен начинаться с YAML frontmatter:

```yaml
---
title: "Заголовок поста"           # Обязательно
description: "Описание поста"      # Обязательно
date: "2024-01-15"                 # Обязательно (YYYY-MM-DD)
tags: ["tag1", "tag2"]             # Обязательно
author: "Автор"                    # Обязательно
coverImage: "/path/to/image.jpg"   # Опционально
---
```

### Markdown/MDX

Поддерживается полный синтаксис Markdown + JSX:

```markdown
# Заголовок

Обычный текст с **жирным** и *курсивом*.

## Код

```javascript
function hello() {
  console.log('Hello, World!');
}
```

## JSX компоненты

<MyCustomComponent prop="value" />

## Изображения

![Alt text](./image.jpg)

## Ссылки

[Внешняя ссылка](https://example.com)
```

## 🎨 Стилизация

Все компоненты используют CSS Modules. Стили находятся в соответствующих `.module.scss` файлах:

- `MDXContent.module.scss` - стили для контента постов
- `PostCard.module.scss` - стили карточек постов
- `TagList.module.scss` - стили списка тегов
- `Pagination.module.scss` - стили пагинации

## 🔧 API

### Утилиты для работы с постами

```typescript
import { getAllPosts, getPostBySlug, getAllTags } from '@/lib/posts';

// Получить все посты
const posts = getAllPosts();

// Получить пост по slug
const post = getPostBySlug('my-post-slug');

// Получить все теги
const tags = getAllTags();

// Получить посты по тегу
const postsByTag = getPostsByTag('nextjs');
```

### Типы

```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  coverImage?: string;
  content: string;
  readingTime: number;
}
```

## 🚀 Деплой

Блог полностью совместим с Vercel и другими платформами для Next.js:

1. Убедитесь, что `NEXT_PUBLIC_ENABLE_BLOG=true` в переменных окружения
2. Деплойте как обычное Next.js приложение
3. Все посты будут сгенерированы статически

## 📱 Страницы

- `/blog` - список всех постов с пагинацией
- `/blog/[slug]` - отдельный пост
- `/blog/tags/[tag]` - посты по тегу

## ⚙️ Feature Toggle

Блог можно отключить через переменную окружения:

```bash
NEXT_PUBLIC_ENABLE_BLOG=false
```

При отключении все страницы блога будут возвращать 404.

## 🔍 SEO

- Автоматическая генерация метаданных
- Open Graph теги
- Структурированные данные
- Оптимизированные изображения

## 📦 Зависимости

- `next-mdx-remote` - рендеринг MDX
- `gray-matter` - парсинг frontmatter
- `next` - Next.js фреймворк
- `react` - React библиотека

## 🤝 Вклад в проект

1. Создайте новый пост в `content/posts/`
2. Следуйте существующему формату frontmatter
3. Используйте TypeScript для новых компонентов
4. Запустите `npm run lint` перед коммитом

## 📄 Лицензия

MIT License
