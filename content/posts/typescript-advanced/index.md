---
title: "Продвинутый TypeScript для разработчиков"
date: "2024-01-25"
excerpt: "Условные типы, mapped types, template literal types и другие продвинутые возможности TypeScript"
tags: ["TypeScript", "JavaScript", "Programming", "Types"]
category: "Programming"
author: "Паша Кузякин"
---

# Продвинутый TypeScript для разработчиков

TypeScript предлагает мощные возможности для создания типобезопасного кода. Рассмотрим продвинутые техники.

## Условные типы (Conditional Types)

Условные типы позволяют создавать типы, которые зависят от других типов.

```typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type DataResponse = ApiResponse<number>;   // { data: number }
```

## Mapped Types

Mapped types позволяют создавать новые типы на основе существующих.

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>; // Все поля опциональные
type RequiredUser = Required<User>; // Все поля обязательные
```

## Template Literal Types

Template literal types позволяют создавать типы на основе строковых шаблонов.

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<'click'>; // 'onClick'
type SubmitEvent = EventName<'submit'>; // 'onSubmit'

// Практический пример
type CSSProperty = `--${string}`;
type CSSVariable = `var(${CSSProperty})`;
```

## Utility Types

TypeScript предоставляет множество встроенных utility types.

```typescript
interface ApiResponse {
  data: any[];
  status: number;
  message: string;
  timestamp: string;
}

// Pick - выбираем только нужные поля
type ApiData = Pick<ApiResponse, 'data' | 'status'>;

// Omit - исключаем ненужные поля
type ApiError = Omit<ApiResponse, 'data'>;

// Record - создаем объект с определенными ключами и значениями
type StatusMessages = Record<number, string>;
```

## Заключение

Продвинутые возможности TypeScript помогают создавать более выразительные и типобезопасные приложения.
