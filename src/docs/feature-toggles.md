# Feature Toggles

Система feature toggles позволяет включать/выключать определенные функции через URL параметры.

## Использование

### Навигационное меню

Для включения навигационного меню в production режиме добавьте параметр `nav` в URL:

```
https://kuzyak.in/?nav=true
https://kuzyak.in/blog?nav=1
https://kuzyak.in/?nav=yes
```

Поддерживаемые значения для включения:
- `true`
- `1` 
- `yes`
- `on`

### Режим отладки

Для включения режима отладки добавьте параметр `debug`:

```
https://kuzyak.in/?debug=true
https://kuzyak.in/blog?debug=1
```

## Техническая реализация

### Файлы

- `src/utils/urlParams.ts` - утилиты для работы с URL параметрами
- `src/types/global.d.ts` - типы для feature toggles
- `src/components/layout/Header/Header.tsx` - компонент с поддержкой feature toggle

### API

```typescript
// Проверка конкретного feature toggle
isNavigationEnabled(): boolean
isDebugMode(): boolean

// Универсальная функция
getFeatureToggle(key: FeatureToggleKey, defaultValue?: boolean): boolean

// Получение всех активных toggles
getAllFeatureToggles(): FeatureToggleConfig
```

### Добавление новых feature toggles

1. Добавьте новый ключ в `FeatureToggleConfig` в `src/types/global.d.ts`
2. Добавьте маппинг параметра в `paramMap` в `src/utils/urlParams.ts`
3. Создайте удобную функцию-обертку (опционально)
4. Используйте `getFeatureToggle()` в компонентах

## Примеры использования

```typescript
import { isNavigationEnabled, getFeatureToggle } from '@/utils/urlParams';

// В компоненте
const showNavigation = isNavigationEnabled();

// Или универсально
const showDebugInfo = getFeatureToggle('debug', false);
```
