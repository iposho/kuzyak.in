/**
 * Утилиты для работы с URL параметрами и feature toggles
 */

import type { FeatureToggleConfig, FeatureToggleKey } from '@/types/global';

/**
 * Проверяет наличие GET параметра в URL
 * @param paramName - имя параметра
 * @param defaultValue - значение по умолчанию
 * @returns значение параметра или значение по умолчанию
 */
export function getUrlParam(paramName: string, defaultValue: boolean = false): boolean {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get(paramName);

  if (paramValue === null) {
    return defaultValue;
  }

  // Поддерживаем различные варианты true значений
  return ['true', '1', 'yes', 'on'].includes(paramValue.toLowerCase());
}

/**
 * Универсальная функция для проверки feature toggle
 * @param key - ключ feature toggle
 * @param defaultValue - значение по умолчанию
 * @returns значение feature toggle
 */
export function getFeatureToggle(key: FeatureToggleKey, defaultValue: boolean = false): boolean {
  const paramMap: Record<FeatureToggleKey, string> = {
    navigation: 'nav',
    debug: 'debug',
  };

  return getUrlParam(paramMap[key], defaultValue);
}

/**
 * Проверяет, включен ли feature toggle для навигации
 * @returns true если навигация должна быть показана
 */
export function isNavigationEnabled(): boolean {
  return getFeatureToggle('navigation', false);
}

/**
 * Проверяет, включен ли feature toggle для отладки
 * @returns true если режим отладки включен
 */
export function isDebugMode(): boolean {
  return getFeatureToggle('debug', false);
}

/**
 * Получает все активные feature toggles из URL
 * @returns объект с текущими значениями feature toggles
 */
export function getAllFeatureToggles(): FeatureToggleConfig {
  return {
    navigation: isNavigationEnabled(),
    debug: isDebugMode(),
  };
}
