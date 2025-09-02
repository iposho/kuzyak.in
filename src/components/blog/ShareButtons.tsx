'use client';

import { usePathname } from 'next/navigation';
import {
  FaTelegramPlane,
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaLink,
} from 'react-icons/fa6';
import { useState } from 'react';
import css from './ShareButtons.module.scss';

interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const pathname = usePathname();
  const url = typeof window !== 'undefined' ? window.location.origin + pathname : '';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={css.shareButtons}>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className={css.shareButton}
      >
        <FaLink />
        {copied && <span className={css.copied}>Скопировано</span>}
      </button>
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Telegram"
        className={css.shareButton}
      >
        <FaTelegramPlane />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className={css.shareButton}
      >
        <FaXTwitter />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className={css.shareButton}
      >
        <FaFacebookF />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={css.shareButton}
      >
        <FaLinkedinIn />
      </a>
    </div>
  );
}
