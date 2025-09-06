import { useMemo } from 'react';
import { markdownToHtmlSync } from '../../../utils/markdownToMdx';
import styles from './MDXContent.module.scss';

interface MDXContentProps {
  content: string;
}

export default function MDXContent({ content }: MDXContentProps) {
  // Обрабатываем контент для безопасного рендеринга
  const processedContent = useMemo(() => {
    try {
      // Используем нашу утилиту для преобразования Markdown в безопасный HTML
      return markdownToHtmlSync(content);
    } catch (error) {
      console.error('Ошибка при обработке Markdown контента:', error);
      // Возвращаем безопасную версию в случае ошибки
      return markdownToHtmlSync(content.replace(/<[^>]*>/g, ''));
    }
  }, [content]);

  return (
    <div 
      className={styles.mdxContent}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}