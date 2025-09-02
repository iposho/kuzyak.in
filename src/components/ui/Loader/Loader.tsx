import React from 'react';
import css from './Loader.module.scss';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  text = 'Загрузка...',
  className = '',
}) => (
  <div className={`${css.loaderContainer} ${css[size]} ${className}`}>
    <div className={css.spinner}>
      <div className={css.spinnerInner} />
    </div>
    {text && <p className={css.loaderText}>{text}</p>}
  </div>
);

export default Loader;
