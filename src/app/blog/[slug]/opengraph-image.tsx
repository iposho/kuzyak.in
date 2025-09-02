import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';

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
            backgroundColor: '#fff',
            padding: '40px 80px',
          }}
        >
          <div
            style={{
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
                color: '#1a1a1a',
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
                  color: '#6b7280',
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
                color: '#9ca3af',
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
                      backgroundColor: '#f3f4f6',
                      color: '#4b5563',
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
              color: '#3b82f6',
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
