import { ImageResponse } from 'next/og';
import { METADATA_BASE } from '@/constants/base';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

const semiBoldFontUrl = new URL('/public/fonts/IBMPlexSans-SemiBold.ttf', import.meta.url);
const regularFontUrl = new URL('/public/fonts/IBMPlexSans-Regular.ttf', import.meta.url);

export default async function GET() {
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
          justifyContent: 'flex-start',
          letterSpacing: '-.02em',
          padding: '2rem 0',
          flexDirection: 'column',
          fontWeight: 700,
          backgroundColor: '#f6f6f6',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            padding: '1rem 3rem',
            marginBottom: '2.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              borderRadius: '50%',
              backgroundColor: 'rgb(59,67,152)',
              width: '50px',
              height: '50px',
            }}
          />
        </div>
        <div
          style={{
            fontFamily: 'IBM Plex Sans',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            padding: '20px 150px',
            margin: '0 42px',
            marginTop: '-40px',
            fontSize: 70,
            width: '100%',
            fontWeight: 600,
            textAlign: 'left',
            color: '#111',
            lineHeight: 1.125,
          }}
        >
          Привет, меня зовут Паша&nbsp;Кузякин.
        </div>
        <div
          style={{
            fontFamily: '"IBM Plex Sans", Arial, sans-serif',
            display: 'flex',
            padding: '20px 150px',
            width: '100%',
            margin: '0 42px',
            marginTop: '-20px',
            fontSize: 64,
            fontWeight: 400,
          }}
        >
          Я&nbsp;фронтенд-разработчик.
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            padding: '20px 150px',
            margin: '0 42px',
            marginTop: '-20px',
            fontSize: 64,
            width: '100%',
            fontWeight: 400,
            textAlign: 'center',
            color: 'rgb(59,67,152)',
            lineHeight: 1.4,
            position: 'absolute',
            bottom: '60px',
          }}
        >
          {METADATA_BASE.host}
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
}
