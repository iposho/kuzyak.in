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

  const uint8Array = new Uint8Array(image);
  let binary = '';
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  const dataUrl = `data:${contentType};base64,${btoa(binary)}`;

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
