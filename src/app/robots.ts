import { MetadataRoute } from 'next';
import { METADATA_BASE } from '@/constants/base';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${METADATA_BASE}sitemap.xml`,
  };
}
