---
title: "5 полезных TypeScript трюков"
date: "2025-01-05"
excerpt: "Подборка полезных приёмов работы с TypeScript, которые сделают ваш код более безопасным и читаемым."
tags: ["typescript", "tips", "разработка"]
category: "Туториалы"
author: "Павел Кузякин"
---

# 5 полезных TypeScript трюков

TypeScript — мощный инструмент, но многие используют лишь малую часть его возможностей. Вот несколько трюков, которые помогут писать лучший код.

## 1. Conditional Types

Условные типы позволяют создавать гибкие типы:

```typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type DataResponse = ApiResponse<User>; // { data: User }
```

## 2. Template Literal Types

Создавайте типы на основе строковых шаблонов:

```typescript
type EventName = `on${Capitalize<string>}`;
type ClickEvent = `onClick`; // ✅
type HoverEvent = `onHover`; // ✅
```

## 3. Utility Types

Используйте встроенные утилиты:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<User, 'password'>; // без пароля
type UserUpdate = Partial<Pick<User, 'name' | 'email'>>; // частичное обновление
```

## 4. Branded Types

Создавайте "брендированные" типы для большей безопасности:

```typescript
type UserId = string & { __brand: 'UserId' };
type PostId = string & { __brand: 'PostId' };

function getUser(id: UserId) { /* ... */ }
function getPost(id: PostId) { /* ... */ }

// getUser(postId); // ❌ Type error!
```

## 5. Const Assertions

Используйте `as const` для точных типов:

```typescript
const themes = ['light', 'dark'] as const;
type Theme = typeof themes[number]; // 'light' | 'dark'

const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
} as const;
// Все свойства становятся readonly
```

## Заключение

TypeScript — это не просто "JavaScript с типами". Это мощная система типов, которая может значительно улучшить качество вашего кода.

Какие TypeScript фичи используете вы? Поделитесь в комментариях!