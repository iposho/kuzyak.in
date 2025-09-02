import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `      <item>
        <title>${post.metadata.title}</title>
        <link>https://kuzyak.in/blog/${post.slug}</link>
        <pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>
        <guid>https://kuzyak.in/blog/${post.slug}</guid>
      </item>`,
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>kuzyak.in Blog</title>
    <link>https://kuzyak.in/blog</link>
    <description>Updates from kuzyak.in blog</description>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
