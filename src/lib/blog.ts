import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostMetadata {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  category?: string;
  featured_image?: string;
  author?: string;
  draft?: boolean;
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
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    ensurePostsDirectory();
    const fullPath = path.join(postsDirectory, slug, 'index.md');

    if (!fs.existsSync(fullPath)) {
      return null;
    }

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

    const htmlContent = processedContent.toString();

    return {
      slug,
      metadata: data as PostMetadata,
      content,
      htmlContent,
    };
  } catch (error) {
    return null;
  }
}

// Get all posts with metadata only
export function getAllPosts(): PostSummary[] {
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

          return {
            slug,
            metadata: data as PostMetadata,
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
}

// Get posts by tag
export function getPostsByTag(tag: string): PostSummary[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.metadata.tags?.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()));
}

// Get posts by category
export function getPostsByCategory(category: string): PostSummary[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.metadata.category?.toLowerCase() === category.toLowerCase());
}

// Get all unique tags
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();

  allPosts.forEach((post) => {
    post.metadata.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

// Get all unique categories
export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = new Set<string>();

  allPosts.forEach((post) => {
    if (post.metadata.category) {
      categories.add(post.metadata.category);
    }
  });

  return Array.from(categories).sort();
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

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
