import { MetadataRoute } from 'next';
import { METADATA } from '@/constants/base';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${METADATA}sitemap.xml`,
  };
}
