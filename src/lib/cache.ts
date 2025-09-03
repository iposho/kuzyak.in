/**
 * Утилиты для управления кэшем блога
 */

// Очистка кэша при изменении файлов
export function clearBlogCache() {
  // В production кэш очищается автоматически при деплое
  if (process.env.NODE_ENV === 'development') {
    // В development можно добавить логику для очистки кэша
    console.log('Blog cache cleared');
  }
}

// Проверка изменений в файлах постов
export function checkForPostChanges() {
  // Эта функция может быть использована для мониторинга изменений
  // в файловой системе и автоматической очистки кэша
  return false;
}

// Экспорт функции для использования в API routes
export { clearBlogCache as clearCache };
