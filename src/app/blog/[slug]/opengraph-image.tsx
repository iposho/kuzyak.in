import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';

export const runtime = 'nodejs';

export const size = {
  width: 1200,
  height: 630,
};

const semiBoldFontUrl = new URL('/public/fonts/IBMPlexSans-SemiBold.ttf', import.meta.url);
const regularFontUrl = new URL('/public/fonts/IBMPlexSans-Regular.ttf', import.meta.url);

export default async function GET({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    const semiBoldFontData = await fetch(semiBoldFontUrl).then((res) => res.arrayBuffer());
    const regularFontData = await fetch(regularFontUrl).then((res) => res.arrayBuffer());

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
                fontFamily: 'IBM Plex Sans',
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
                  fontFamily: 'IBM Plex Sans',
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
                fontFamily: 'IBM Plex Sans',
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
                      fontFamily: 'IBM Plex Sans',
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
              fontFamily: 'IBM Plex Sans',
            }}
          >
            kuzyak.in
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: 'IBM Plex Sans',
            data: semiBoldFontData,
            style: 'normal',
            weight: 600,
          },
          {
            name: 'IBM Plex Sans',
            data: regularFontData,
            style: 'normal',
            weight: 400,
          },
        ],
      },
    );
  } catch (error) {
    return new Response('Failed to generate image', { status: 500 });
  }
}
