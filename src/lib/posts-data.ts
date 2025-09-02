// Импорты markdown файлов как raw текст

// Импортируем все посты как модули
import frontendTrends2025 from '../../content/posts/frontend-trends-2025.md?raw';
import typescriptTips from '../../content/posts/typescript-tips.md?raw';
import welcomeToMyBlog from '../../content/posts/welcome-to-my-blog.md?raw';

// Мапа всех постов
const postsMap = {
  'frontend-trends-2025': frontendTrends2025,
  'typescript-tips': typescriptTips,
  'welcome-to-my-blog': welcomeToMyBlog,
};

export function getPostContentBySlug(slug: string): string | null {
  return postsMap[slug as keyof typeof postsMap] || null;
}

export function getAllPostSlugs(): string[] {
  return Object.keys(postsMap);
}
