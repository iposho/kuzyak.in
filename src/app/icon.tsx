import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default async function Icon() {
  const image = await fetch(new URL('/public/images/face.png', import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );

  const dataUrl = `data:${contentType};base64,${Buffer.from(image).toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          backgroundColor: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'transparent',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={dataUrl}
          width={32}
          height={32}
          style={{
            backgroundColor: 'transparent',
            boxShadow: '8px 8px 45px -15px rgb(0 0 0 / 75%)',
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
