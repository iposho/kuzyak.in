'use client';

import { useEffect, useState } from 'react';
import { FaMusic } from 'react-icons/fa';
import Image from 'next/image';
import css from './CurrentTrack.module.scss';

interface Track {
  name: string;
  artist: string;
  url: string;
  image: string;
}

function CurrentTrack() {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const response = await fetch('/api/lastfm');
        const data = await response.json();

        if (data.error) {
          setError(data.error);
          return;
        }

        setTrack(data.track);
      } catch (err) {
        setError('Не удалось загрузить текущий трек');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 30000); // Обновляем каждые 30 секунд

    return () => clearInterval(interval);
  }, []);

  if (loading) return null;
  if (error) return null;
  if (!track) return null;

  return (
    <div className={css.track}>
      <div className={css.cover}>
        {track.image ? (
          <Image
            src={track.image}
            alt={`Обложка трека ${track.name}`}
            width={48}
            height={48}
            className={css.coverImage}
          />
        ) : (
          <FaMusic className={css.coverIcon} />
        )}
      </div>
      <div className={css.info}>
        <a href={track.url} target="_blank" rel="noreferrer" className={css.link}>
          {track.name}
        </a>
        <span className={css.artist}>{track.artist}</span>
      </div>
    </div>
  );
}

export { CurrentTrack };
