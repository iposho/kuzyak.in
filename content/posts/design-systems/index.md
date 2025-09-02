---
title: "Создание дизайн-системы с нуля"
date: "2024-02-15"
excerpt: "От атомов до организмов: построение масштабируемой дизайн-системы"
tags: ["Design System", "UI/UX", "Components", "Figma"]
category: "Design"
author: "Паша Кузякин"
---

# Создание дизайн-системы с нуля

Дизайн-система - это набор стандартизированных компонентов, правил и принципов для создания согласованных интерфейсов.

## Atomic Design Methodology

Методология Брэда Фроста для структурирования компонентов.

### Atoms (Атомы)
Базовые элементы интерфейса.

```jsx
// Button atom
const Button = ({ variant, size, children, ...props }) => {
  const baseStyles = "font-medium rounded-md transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Molecules (Молекулы)
Комбинации атомов.

```jsx
// Search molecule
const SearchBox = ({ onSearch, placeholder }) => {
  const [query, setQuery] = useState("");

  return (
    <div className="flex gap-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
      />
      <Button onClick={() => onSearch(query)}>
        Search
      </Button>
    </div>
  );
};
```

### Organisms (Организмы)
Сложные компоненты из молекул и атомов.

```jsx
// Header organism
const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <SearchBox onSearch={handleSearch} />
          <UserMenu user={user} onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
};
```

## Design Tokens

Централизованные значения для дизайна.

```javascript
// design-tokens.js
export const tokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
    gray: {
      50: '#f9fafb',
      500: '#6b7280',
      900: '#111827',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
  },
};
```

## Documentation

Документирование компонентов критически важно.

```jsx
// Button.stories.js
export default {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Основная кнопка для действий пользователя.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Визуальный стиль кнопки',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Размер кнопки',
    },
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};
```

## Заключение

Дизайн-система - это инвестиция в будущее продукта, которая окупается масштабируемостью и консистентностью.
