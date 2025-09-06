import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostFrontmatter, Tag } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');

/**
 * Получает все посты из директории content/posts
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => {
      const fullPath = path.join(postsDirectory, name);
      return fs.statSync(fullPath).isDirectory();
    })
    .map((slug) => {
      const fullPath = path.join(postsDirectory, slug, 'index.md');

      if (!fs.existsSync(fullPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const frontmatter = data as BlogPostFrontmatter;
      const readingTime = Math.ceil(content.split(' ').length / 200);

      return {
        slug,
        content,
        readingTime,
        ...frontmatter,
      } as BlogPost;
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return allPostsData;
}

/**
 * Получает пост по slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, slug, 'index.md');

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const frontmatter = data as BlogPostFrontmatter;
  const readingTime = Math.ceil(content.split(' ').length / 200);

  return {
    slug,
    content,
    readingTime,
    ...frontmatter,
  } as BlogPost;
}

/**
 * Получает все уникальные теги с количеством постов
 */
export function getAllTags(): Tag[] {
  const posts = getAllPosts();
  const tagCount: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Получает посты по тегу
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

/**
 * Получает все slug'и постов для generateStaticParams
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.filter((name) => {
    const fullPath = path.join(postsDirectory, name);
    return fs.statSync(fullPath).isDirectory()
           && fs.existsSync(path.join(fullPath, 'index.md'));
  });
}

/**
 * Получает все теги для generateStaticParams
 */
export function getAllTagSlugs(): string[] {
  const tags = getAllTags();
  return tags.map((tag) => tag.name);
}
