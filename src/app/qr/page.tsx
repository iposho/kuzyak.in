'use client';

import { ReactElement } from 'react';

import { useQRCode } from 'next-qrcode';

import { METADATA } from '@/constants/base';

import css from './page.module.scss';

const setWidth = () => {
  if (typeof window === 'undefined') {
    return 320;
  }

  const { outerWidth } = window;

  if (outerWidth < 320) {
    return outerWidth - 32;
  }

  return 480;
};

export default function Page():ReactElement {
  const { Canvas } = useQRCode();
  const text = METADATA.BASE.toString();

  return (
    <div className={css.qr}>
      <Canvas
        text={text}
        options={{
          errorCorrectionLevel: 'M',
          margin: 3,
          scale: 4,
          width: setWidth(),
          color: {
            dark: '#1a1a1a',
            light: '#ffffff',
          },
        }}
      />
    </div>

  );
}
