import { ImageResponse } from 'next/og';
import {
  METADATA_BASE,
  METADATA_ROLE,
  METADATA_TITLE,
} from '@/constants/base';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function GET() {
  const image = await fetch(new URL('/public/og.png', import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );

  const logo = `data:${contentType};base64,${Buffer.from(image).toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: '-.02em',
          flexDirection: 'column',
          fontWeight: 700,
          backgroundColor: '#fdf6f2',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '20px 50px',
            margin: '0 42px',
            marginTop: '-40px',
            fontSize: 64,
            width: 'auto',
            maxWidth: 768,
            textAlign: 'center',
            backgroundColor: '#111',
            color: '#f6f6f6',
            lineHeight: 1.4,
            boxShadow: '8px 8px 45px -15px #000',
          }}
        >
          {METADATA_TITLE}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '1rem',
            margin: '1rem 0',
            fontSize: 40,
            width: 'auto',
            maxWidth: 768,
            textAlign: 'center',
            backgroundColor: '#222',
            color: '#f6f6f6',
            lineHeight: 1.4,
            boxShadow: '8px 8px 45px -15px #000',
          }}
        >
          {METADATA_ROLE}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifySelf: 'flex-start',
            color: '#111',
            position: 'absolute',
            bottom: 72,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={METADATA_TITLE}
            src={logo}
            width={50}
            height={50}
            style={{
              borderRadius: '50%',
              backgroundColor: '#00b2ff',
            }}
          />
          <span
            style={{
              marginLeft: 8,
              fontSize: 40,
              color: '#000',
            }}
          >
            <span
              style={{
                color: 'rgba(0,0,0,0.5)',
              }}
            >
              pavel@
            </span>
            {METADATA_BASE.host}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
