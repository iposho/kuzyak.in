'use client';

import { useQRCode } from 'next-qrcode';

import {
  METADATA_BASE,
} from '@/app/constants/metadata';

import { ReactElement } from 'react';
import css from './qr.module.scss';

const setWidth = () => {
  if (typeof window === 'undefined') {
    return 320;
  }

  const { outerWidth } = window;

  if (outerWidth < 320) {
    return outerWidth - 32;
  }

  return 320;
};

export default function Page():ReactElement {
  const { Canvas } = useQRCode();
  return (
    <div className={css.qr}>
      <Canvas
        text={METADATA_BASE.toString()}
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
