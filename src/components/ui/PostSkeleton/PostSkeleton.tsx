import React from 'react';
import css from './PostSkeleton.module.scss';

interface PostSkeletonProps {
  count?: number;
  className?: string;
}

export const PostSkeleton: React.FC<PostSkeletonProps> = ({
  count = 1,
  className = '',
}) => (
  <div className={`${css.skeletonGrid} ${className}`}>
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className={css.skeletonCard}>
        <div className={css.skeletonImage} />
        <div className={css.skeletonTitle} />
        <div className={css.skeletonExcerpt} />
        <div className={css.skeletonExcerpt} />
        <div className={css.skeletonMeta} />
      </div>
    ))}
  </div>
);

export default PostSkeleton;
