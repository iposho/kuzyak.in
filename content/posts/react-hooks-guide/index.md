---
title: "Полное руководство по React Hooks"
date: "2024-01-15"
excerpt: "Изучаем все хуки React от useState до useCallback с практическими примерами"
tags: ["React", "JavaScript", "Frontend", "Hooks"]
category: "Frontend"
author: "Паша Кузякин"
featured_image: "/images/jsx.webp"
---

# Полное руководство по React Hooks

React Hooks изменили способ написания компонентов в React. В этом руководстве мы рассмотрим все основные хуки и их практическое применение.

## useState - Управление состоянием

`useState` - это самый базовый хук для управления локальным состоянием компонента.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Счетчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Увеличить
      </button>
    </div>
  );
}
```

## useEffect - Побочные эффекты

`useEffect` позволяет выполнять побочные эффекты в функциональных компонентах.

```jsx
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return <div>{data ? data.title : 'Загрузка...'}</div>;
}
```

## useCallback и useMemo - Оптимизация производительности

Эти хуки помогают оптимизировать производительность, предотвращая ненужные перерендеры.

```jsx
import { useState, useCallback, useMemo } from 'react';

function ExpensiveComponent({ items }) {
  const [filter, setFilter] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  const handleClick = useCallback((id) => {
    console.log('Clicked item:', id);
  }, []);

  return (
    <div>
      <input 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Фильтр..."
      />
      {filteredItems.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

## Заключение

React Hooks предоставляют мощный и гибкий способ работы с состоянием и побочными эффектами в функциональных компонентах. Правильное использование хуков поможет создать более читаемый и производительный код.
