import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import DOMPurify from 'isomorphic-dompurify';

/**
 * Конвертирует Markdown в безопасный HTML с использованием remark
 * @param markdown - Markdown контент
 * @returns Обработанный HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  try {
    // Используем remark для преобразования Markdown в HTML
    const processor = remark()
      .use(remarkGfm) // Поддержка GitHub Flavored Markdown
      .use(remarkHtml); // Используем встроенную санитизацию

    const result = await processor.process(markdown);
    const html = String(result);

    // Дополнительная санитизация с помощью DOMPurify для большей безопасности
    const sanitizedHtml = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'ul', 'ol', 'li',
        'blockquote',
        'pre', 'code',
        'a', 'strong', 'em', 'del', 'ins',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'img',
        'div', 'span'
      ],
      ALLOWED_ATTR: [
        'href', 'title', 'alt', 'src', 'width', 'height',
        'class', 'id', 'target', 'rel'
      ],
      ALLOW_DATA_ATTR: false,
      ALLOW_UNKNOWN_PROTOCOLS: false,
      SANITIZE_DOM: true,
      KEEP_CONTENT: true,
      RETURN_DOM: false,
      RETURN_DOM_FRAGMENT: false
    });

    return sanitizedHtml;
  } catch (error) {
    console.error('Ошибка при преобразовании Markdown в HTML:', error);
    // Возвращаем безопасную версию в случае ошибки
    return DOMPurify.sanitize(markdown, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    });
  }
}

/**
 * Синхронная версия для случаев, когда async/await недоступен
 * @param markdown - Markdown контент
 * @returns Обработанный HTML
 */
export function markdownToHtmlSync(markdown: string): string {
  try {
    // Простое преобразование Markdown в HTML с помощью регулярных выражений
    // Это временное решение для синхронного использования
    let html = markdown
      // Заголовки
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
      .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
      .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
      // Код блоки
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Ссылки
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      // Списки
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
      // Выделение текста
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Цитаты
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Параграфы
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[h1-6]|<pre|<ul|<li|<blockquote)/gm, '<p>')
      .replace(/(?<!>)$/gm, '</p>')
      // Очистка лишних тегов
      .replace(/<p><\/p>/g, '')
      .replace(/<p>(<h[1-6]>)/g, '$1')
      .replace(/(<\/h[1-6]>)<\/p>/g, '$1')
      .replace(/<p>(<pre>)/g, '$1')
      .replace(/(<\/pre>)<\/p>/g, '$1')
      .replace(/<p>(<ul>)/g, '$1')
      .replace(/(<\/ul>)<\/p>/g, '$1')
      .replace(/<p>(<blockquote>)/g, '$1')
      .replace(/(<\/blockquote>)<\/p>/g, '$1');

    // Санитизация с помощью DOMPurify
    const sanitizedHtml = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'ul', 'ol', 'li',
        'blockquote',
        'pre', 'code',
        'a', 'strong', 'em', 'del', 'ins',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'img',
        'div', 'span'
      ],
      ALLOWED_ATTR: [
        'href', 'title', 'alt', 'src', 'width', 'height',
        'class', 'id', 'target', 'rel'
      ],
      ALLOW_DATA_ATTR: false,
      ALLOW_UNKNOWN_PROTOCOLS: false,
      SANITIZE_DOM: true,
      KEEP_CONTENT: true,
      RETURN_DOM: false,
      RETURN_DOM_FRAGMENT: false
    });

    return sanitizedHtml;
  } catch (error) {
    console.error('Ошибка при синхронном преобразовании Markdown в HTML:', error);
    // Возвращаем безопасную версию в случае ошибки
    return DOMPurify.sanitize(markdown, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    });
  }
}
