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

export default async function GET() {
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
            padding: '0 1rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              borderRadius: '50%',
              backgroundColor: 'rgb(59,67,152)',
              width: '70px',
              height: '70px',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            padding: '20px 150px',
            margin: '0 42px',
            marginTop: '-40px',
            fontSize: 80,
            width: '100%',
            // maxWidth: 768,
            fontWeight: 'bold',
            textAlign: 'left',
            color: '#111',
            lineHeight: 1.4,
            // textShadow: '8px 8px 45px -15px #000',
          }}
        >
          {METADATA_TITLE}
        </div>
        <div
          style={{
            display: 'flex',
            padding: '20px 150px',
            width: '100%',
            margin: '0 42px',
            marginTop: '-40px',
            fontSize: 64,
          }}
        >
          {METADATA_ROLE}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            padding: '20px 150px',
            margin: '0 42px',
            marginTop: '-40px',
            fontSize: 72,
            width: '100%',
            fontWeight: '700',
            textAlign: 'center',
            color: 'rgb(59,67,152)',
            lineHeight: 1.4,
            position: 'absolute',
            bottom: '80px',
          }}
        >
          {METADATA_BASE.host}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
