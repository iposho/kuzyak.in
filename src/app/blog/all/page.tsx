import { Suspense } from 'react';
import AllPostsPageContent from '@/components/blog/AllPostsPageContent';
import { PostSkeleton } from '@/components/ui/PostSkeleton';
import css from './page.module.scss';

export default function AllPostsPage() {
  return (
    <Suspense fallback={(
      <div className={css.allPostsPage}>
        <PostSkeleton count={8} />
      </div>
    )}
    >
      <AllPostsPageContent />
    </Suspense>
  );
}
