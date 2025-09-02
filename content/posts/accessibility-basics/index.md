---
title: "Основы веб-доступности (A11y)"
date: "2024-02-05"
excerpt: "Создание доступных веб-интерфейсов для всех пользователей"
tags: ["Accessibility", "A11y", "UX", "Inclusive Design"]
category: "UX/UI"
author: "Паша Кузякин"
---

# Основы веб-доступности (A11y)

Веб-доступность - это практика создания веб-сайтов, которые могут использовать люди с различными способностями и ограничениями.

## Семантическая разметка

Используйте правильные HTML-теги для структурирования контента.

```html
<!-- Плохо -->
<div class="header">Заголовок</div>
<div class="button" onclick="submit()">Отправить</div>

<!-- Хорошо -->
<header>
  <h1>Заголовок</h1>
</header>
<button type="submit">Отправить</button>
```

## ARIA атрибуты

ARIA (Accessible Rich Internet Applications) помогает сделать динамический контент доступным.

```html
<!-- Индикатор загрузки -->
<div 
  role="progressbar" 
  aria-valuenow="75" 
  aria-valuemin="0" 
  aria-valuemax="100"
  aria-label="Загрузка: 75%"
>
  <div style="width: 75%"></div>
</div>

<!-- Модальное окно -->
<div 
  role="dialog" 
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Подтверждение</h2>
  <p id="modal-description">Вы уверены, что хотите удалить этот элемент?</p>
</div>
```

## Навигация с клавиатуры

Обеспечьте возможность навигации только с клавиатуры.

```css
/* Видимый фокус */
button:focus,
input:focus,
a:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* Скрыть фокус только для мыши */
button:focus:not(:focus-visible) {
  outline: none;
}
```

## Цветовой контраст

Обеспечьте достаточный контраст между текстом и фоном.

```css
/* Минимальный контраст 4.5:1 для обычного текста */
.text-primary {
  color: #000000; /* Контраст с белым фоном: 21:1 */
  background-color: #ffffff;
}

/* Минимальный контраст 3:1 для крупного текста */
.text-large {
  color: #333333; /* Контраст с белым фоном: 12.6:1 */
  font-size: 18px;
}
```

## Альтернативный текст для изображений

Всегда предоставляйте осмысленный alt-текст.

```html
<!-- Информативное изображение -->
<img 
  src="chart.png" 
  alt="График продаж за 2024 год показывает рост на 25%"
>

<!-- Декоративное изображение -->
<img 
  src="decoration.png" 
  alt=""
  role="presentation"
>
```

## Заключение

Доступность - это не дополнительная функция, а основа качественного пользовательского опыта для всех.
