import { ImageResponse } from 'next/og';
import { METADATA_DESCRIPTION, METADATA_SITE_NAME, METADATA_TITLE } from '@/app/constants/metadata';

export const runtime = 'edge';

export const alt = 'Павел Кузякин';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function GET() {
  const image = await fetch(new URL('/public/og.png', import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );

  const dataUrl = `data:${contentType};base64,${Buffer.from(image).toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 54,
          background: 'linear-gradient(60deg, rgba(0,0,0,1) 0%, #111 35%, #000 70%)',
          color: '#fff',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={dataUrl}
            width={100}
            height={100}
            style={{
              borderRadius: '50%',
              backgroundColor: '#4682b4',
              boxShadow: '8px 8px 45px -15px #000',
              marginRight: '16px',
            }}
          />
          <h1
            style={{
              fontSize: 72,
              margin: 0,
              fontWeight: 'bolder',
            }}
          >
            {METADATA_TITLE}
          </h1>
        </div>
        <h2
          style={{
            fontSize: 48,
            margin: '12px 0',
            width: '100%',
            color: '#f6f6f6',
            maxWidth: '900px',
            textAlign: 'center',
          }}
        >
          {METADATA_DESCRIPTION}
        </h2>
        <h3
          style={{
            fontSize: 40,
            margin: 0,
            color: 'lightskyblue',
          }}
        >
          {METADATA_SITE_NAME}
        </h3>
      </div>
    ),
    {
      ...size,
    },
  );
}
