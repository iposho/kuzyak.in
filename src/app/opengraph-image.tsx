import { ImageResponse } from 'next/og';

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
          background: 'linear-gradient(60deg, rgba(0,0,0,1) 0%, rgba(34,34,34,1) 100%)',
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
              fontSize: 54,
              margin: 0,
              fontWeight: 'bold',
            }}
          >
            Павел Кузякин
          </h1>
        </div>
        <h2
          style={{
            fontSize: 36,
            margin: '12px 0',
            width: '100%',
            maxWidth: '600px',
            textAlign: 'center',
          }}
        >
          Фронтенд-разработчик c опытом руководства командами и направлением
        </h2>
        <h3
          style={{
            fontSize: 36,
            margin: 0,
            color: 'lightskyblue',
          }}
        >
          kuzyak.in
        </h3>
      </div>
    ),
    {
      ...size,
    },
  );
}
