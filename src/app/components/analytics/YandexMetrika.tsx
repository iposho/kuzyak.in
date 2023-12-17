'use client';

import { YMInitializer } from 'react-yandex-metrika';

const options = {
  webvisor: true,
  clickmap: true,
  accurateTrackBounce: true,
  trackLinks: true,
};

const id = Number(process.env.YANDEX_METRIKA_ID);
const isProduction = process.env.NODE_ENV === 'production';

export default function YandexMetrika() {
  return (
    (isProduction && id) && (
      <YMInitializer
        accounts={[id]}
        options={options}
        version="2"
      />
    )
  );
}
