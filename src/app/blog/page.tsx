import { Suspense } from 'react';
import BlogPageContent from '@/components/blog/BlogPageContent';
import { PostSkeleton } from '@/components/ui/PostSkeleton';
import css from './page.module.scss';

export default function BlogPage() {
  return (
    <Suspense fallback={(
      <div className={css.blogPage}>
        <PostSkeleton count={6} />
      </div>
    )}
    >
      <BlogPageContent />
    </Suspense>
  );
}
