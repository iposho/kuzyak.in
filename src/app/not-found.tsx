import Link from 'next/link';
import Image from 'next/image';

import { Metadata } from 'next';

import './not-found.scss';

export const metadata: Metadata = {
  title: '404: Страница не найдена',
};

export default function NotFound() {
  return (
    <div className="notFoundPage">
      <h1>Страница не найдена</h1>
      <div className="imageContainer">
        <Link href="/" replace>
          <Image
            src="/images/notfound.png"
            alt="404: Not Found"
            width={1200}
            height={800}
          />
        </Link>
      </div>
    </div>
  );
}
