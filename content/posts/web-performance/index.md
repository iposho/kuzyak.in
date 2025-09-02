---
title: "Оптимизация веб-производительности"
date: "2024-02-01"
excerpt: "Core Web Vitals, lazy loading, code splitting и другие техники оптимизации"
tags: ["Performance", "Web Vitals", "Optimization", "Frontend"]
category: "Performance"
author: "Паша Кузякин"
featured_image: "/images/face.webp"
---

# Оптимизация веб-производительности

Производительность веб-сайтов напрямую влияет на пользовательский опыт и SEO. Рассмотрим основные метрики и способы оптимизации.

## Core Web Vitals

Google использует три ключевые метрики для оценки пользовательского опыта:

### LCP (Largest Contentful Paint)
Время загрузки самого большого контентного элемента.

```html
<!-- Оптимизация LCP -->
<img 
  src="hero-image.jpg" 
  alt="Hero" 
  loading="eager"
  fetchpriority="high"
  width="800" 
  height="600"
>
```

### FID (First Input Delay)
Время от первого взаимодействия пользователя до отклика браузера.

```javascript
// Минимизация JavaScript
const heavyScript = document.createElement('script');
heavyScript.src = 'heavy-library.js';
heavyScript.defer = true; // Загружать после парсинга HTML
document.head.appendChild(heavyScript);
```

### CLS (Cumulative Layout Shift)
Стабильность визуального контента.

```css
/* Резервируем место для изображений */
.image-container {
  aspect-ratio: 16/9;
  background-color: #f0f0f0;
}

/* Избегаем вставки контента выше сгиба */
.ad-banner {
  height: 250px;
  width: 100%;
}
```

## Code Splitting

Разделение кода на более мелкие части для ускорения загрузки.

```javascript
// React lazy loading
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## Resource Hints

Используйте resource hints для предварительной загрузки ресурсов.

```html
<!-- Preload критических ресурсов -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/css/critical.css" as="style">

<!-- Prefetch для навигации -->
<link rel="prefetch" href="/about">
<link rel="prefetch" href="/contact">
```

## Заключение

Регулярный мониторинг и оптимизация производительности критически важны для успеха веб-приложений.
