import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export const size = {
  width: 1200,
  height: 630,
};

export default async function GET({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    // Проверяем наличие preview.png
    const previewPath = path.join(process.cwd(), 'content/posts', params.slug, 'preview.png');
    const hasPreview = fs.existsSync(previewPath);

    // Определяем цвета в зависимости от наличия preview
    const backgroundColor = hasPreview ? '#000' : '#fff';
    const textColor = hasPreview ? '#fff' : '#1a1a1a';
    const secondaryTextColor = hasPreview ? '#e5e5e5' : '#6b7280';
    const metaTextColor = hasPreview ? '#b3b3b3' : '#9ca3af';
    const tagBgColor = hasPreview ? 'rgba(255, 255, 255, 0.2)' : '#f3f4f6';
    const tagTextColor = hasPreview ? '#fff' : '#4b5563';
    const brandColor = hasPreview ? '#60a5fa' : '#3b82f6';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor,
            padding: '40px 80px',
            position: 'relative',
          }}
        >
          {/* Background image overlay if preview exists */}
          {hasPreview && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(file://${previewPath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.3,
                zIndex: 0,
              }}
            />
          )}

          {/* Content overlay */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: 600,
                color: textColor,
                lineHeight: 1.2,
                marginBottom: '20px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              {post.metadata.title}
            </div>

            {post.metadata.excerpt && (
              <div
                style={{
                  fontSize: 24,
                  color: secondaryTextColor,
                  lineHeight: 1.4,
                  marginBottom: '30px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {post.metadata.excerpt}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                fontSize: 18,
                color: metaTextColor,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              <span>
                📅
                {new Date(post.metadata.date).toLocaleDateString('ru-RU')}
              </span>
              {post.metadata.category && (
                <span>
                  📁
                  {post.metadata.category}
                </span>
              )}
              {post.metadata.author && (
                <span>
                  👤
                  {post.metadata.author}
                </span>
              )}
            </div>

            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '10px',
                  marginTop: '20px',
                }}
              >
                {post.metadata.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: tagBgColor,
                      color: tagTextColor,
                      borderRadius: '6px',
                      fontSize: '16px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                    }}
                  >
                    #
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '80px',
              fontSize: '18px',
              color: brandColor,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            kuzyak.in
          </div>
        </div>
      ),
      {
        ...size,
      },
    );
  } catch (error) {
    console.error('Error generating opengraph image:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(`Failed to generate image: ${errorMessage}`, { status: 500 });
  }
}
