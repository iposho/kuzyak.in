import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Кэш для оптимизации производительности
const cache = new Map<string, any>();
const CACHE_TTL = 5 * 60 * 1000; // 5 минут

// Функция для получения данных из кэша или файловой системы
function getCachedData<T>(key: string, fetcher: () => T): T {
  const cached = cache.get(key);
  const now = Date.now();

  if (cached && (now - cached.timestamp) < CACHE_TTL) {
    return cached.data;
  }

  const data = fetcher();
  cache.set(key, { data, timestamp: now });
  return data;
}

// Очистка кэша при изменении файлов
// function clearCache() {
//   cache.clear();
// }

// Расчет времени чтения поста
function calculateReadingTime(content: string): number {
  // Средняя скорость чтения: 200-250 слов в минуту
  // Используем 200 слов в минуту для более точной оценки
  const wordsPerMinute = 200;

  // Убираем HTML теги и считаем только текст
  const textContent = content.replace(/<[^>]*>/g, '');

  // Считаем слова (разделители: пробелы, переносы строк, табы)
  const wordCount = textContent.trim().split(/\s+/).filter((word) => word.length > 0).length;

  // Рассчитываем время чтения в минутах
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  // Минимум 1 минута
  return Math.max(1, readingTime);
}

/**
 * Copy media files from a post directory to the public blog folder.
 *
 * @param slug - Post slug
 */
function copyPostAssets(slug: string) {
  const sourceDir = path.join(postsDirectory, slug);
  const targetDir = path.join(process.cwd(), 'public', 'blog', slug);
  fs.mkdirSync(targetDir, { recursive: true });
  const items = fs.readdirSync(sourceDir);
  items.forEach((item) => {
    if (item === 'index.md') return;
    const srcPath = path.join(sourceDir, item);
    const destPath = path.join(targetDir, item);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

/**
 * Convert a relative featured image path to the public blog URL.
 *
 * @param slug - Post slug
 * @param image - Original image path
 */
function normalizeFeaturedImage(slug: string, image?: string): string | undefined {
  if (!image || /^https?:\/\//i.test(image)) {
    return image;
  }

  return `/blog/${slug}/${image.replace(/^\.\//, '')}`;
}

/**
 * Rewrite relative image paths in generated HTML so they point to public URLs.
 *
 * @param htmlContent - HTML content of the post
 * @param slug - Post slug
 */
function rewriteRelativeImagePaths(htmlContent: string, slug: string): string {
  return htmlContent.replace(
    /(<img[^>]+src=["'])(?!https?:|data:|\/)(\.\/)?([^"']+)/g,
    `$1/blog/${slug}/$3`,
  );
}

export interface PostMetadata {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  category?: string;
  featured_image?: string;
  author?: string;
  draft?: boolean;
  readingTime?: number; // в минутах
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
  htmlContent: string;
}

export interface PostSummary {
  slug: string;
  metadata: PostMetadata;
}

// Ensure posts directory exists
export function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

// Get all post slugs
export function getAllPostSlugs(): string[] {
  return getCachedData('allPostSlugs', () => {
    ensurePostsDirectory();

    try {
      const items = fs.readdirSync(postsDirectory);
      return items
        .filter((item) => {
          const itemPath = path.join(postsDirectory, item);
          return fs.statSync(itemPath).isDirectory()
                 && fs.existsSync(path.join(itemPath, 'index.md'));
        });
    } catch (error) {
      return [];
    }
  });
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return getCachedData(`post-${slug}`, async () => {
    try {
      ensurePostsDirectory();
      const postDir = path.join(postsDirectory, slug);
      const fullPath = path.join(postDir, 'index.md');

      if (!fs.existsSync(fullPath)) {
        return null;
      }

      copyPostAssets(slug);

      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Skip draft posts in production
      if (data.draft && process.env.NODE_ENV === 'production') {
        return null;
      }

      // Process markdown to HTML
      const processedContent = await remark()
        .use(remarkGfm)
        .use(html)
        .process(content);

      let htmlContent = processedContent.toString();
      htmlContent = rewriteRelativeImagePaths(htmlContent, slug);

      // Рассчитываем время чтения
      const readingTime = calculateReadingTime(htmlContent);

      const featuredImage = normalizeFeaturedImage(slug, (data as PostMetadata).featured_image);

      return {
        slug,
        metadata: {
          ...(data as PostMetadata),
          featured_image: featuredImage,
          readingTime,
        },
        content,
        htmlContent,
      };
    } catch (error) {
      return null;
    }
  });
}

// Get all posts with metadata only
export function getAllPosts(): PostSummary[] {
  return getCachedData('allPosts', () => {
    ensurePostsDirectory();

    try {
      const slugs = getAllPostSlugs();
      const posts = slugs
        .map((slug) => {
          try {
            const fullPath = path.join(postsDirectory, slug, 'index.md');
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            // Skip draft posts in production
            if (data.draft && process.env.NODE_ENV === 'production') {
              return null;
            }

            copyPostAssets(slug);
            const featuredImage = normalizeFeaturedImage(slug, (data as PostMetadata).featured_image);

            return {
              slug,
              metadata: { ...(data as PostMetadata), featured_image: featuredImage },
            };
          } catch (error) {
            return null;
          }
        })
        .filter((post): post is PostSummary => post !== null)
        .sort((a, b) => {
          const dateA = new Date(a.metadata.date);
          const dateB = new Date(b.metadata.date);
          return dateB.getTime() - dateA.getTime();
        });

      return posts;
    } catch (error) {
      return [];
    }
  });
}

// Get posts with pagination
export function getPostsPaginated(page: number = 1, limit: number = 6): {
  posts: PostSummary[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const allPosts = getAllPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPosts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

// Get posts by tag
export function getPostsByTag(tag: string): PostSummary[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.metadata.tags?.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()));
}

// Get posts by tag with pagination
export function getPostsByTagPaginated(tag: string, page: number = 1, limit: number = 6): {
  posts: PostSummary[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const allPosts = getPostsByTag(tag);
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPosts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

// Get posts by category
export function getPostsByCategory(category: string): PostSummary[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.metadata.category?.toLowerCase() === category.toLowerCase());
}

// Get posts by category with pagination
export function getPostsByCategoryPaginated(category: string, page: number = 1, limit: number = 6): {
  posts: PostSummary[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const allPosts = getPostsByCategory(category);
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPosts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

// Get all unique tags
export function getAllTags(): string[] {
  return getCachedData('allTags', () => {
    const allPosts = getAllPosts();
    const tags = new Set<string>();

    allPosts.forEach((post) => {
      post.metadata.tags?.forEach((tag) => tags.add(tag));
    });

    return Array.from(tags).sort();
  });
}

// Get all unique categories
export function getAllCategories(): string[] {
  return getCachedData('allCategories', () => {
    const allPosts = getAllPosts();
    const categories = new Set<string>();

    allPosts.forEach((post) => {
      if (post.metadata.category) {
        categories.add(post.metadata.category);
      }
    });

    return Array.from(categories).sort();
  });
}

// Get post navigation (previous/next)
export function getPostNavigation(currentSlug: string): {
  previous: PostSummary | null;
  next: PostSummary | null;
} {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  };
}

// Get related posts based on tags and category
export function getRelatedPosts(currentSlug: string, limit: number = 3): PostSummary[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find((post) => post.slug === currentSlug);

  if (!currentPost) {
    return [];
  }

  const { tags, category } = currentPost.metadata;

  // Считаем "вес" каждого поста на основе общих тегов и категории
  const scoredPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      let score = 0;

      // Бонус за общую категорию
      if (category && post.metadata.category === category) {
        score += 3;
      }

      // Бонус за общие теги
      if (tags && post.metadata.tags) {
        const commonTags = tags.filter((tag) => post.metadata.tags?.includes(tag));
        score += commonTags.length * 2;
      }

      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return scoredPosts;
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
