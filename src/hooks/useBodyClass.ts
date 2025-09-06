'use client';

import { useEffect } from 'react';

/**
 * Хук для управления классами body элемента
 * @param className - класс для добавления/удаления
 * @param condition - условие для применения класса
 */
export const useBodyClass = (className: string, condition: boolean = true) => {
  useEffect(() => {
    if (condition) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }

    // Очистка при размонтировании компонента
    return () => {
      document.body.classList.remove(className);
    };
  }, [className, condition]);
};
