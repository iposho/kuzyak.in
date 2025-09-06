export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  coverImage?: string;
  content: string;
  readingTime: number;
}

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  coverImage?: string;
}

export interface Tag {
  name: string;
  count: number;
}
