'use client';

import { useEffect, useState } from 'react';

import { CiStreamOn } from 'react-icons/ci';

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
        setLoading(true);
        setError(null);

        const response = await fetch('/api/lastfm');
        const data = await response.json();

        if (data.error) {
          setError(data.error);
          return;
        }

        if (track?.name !== data.track?.name || track?.artist !== data.track?.artist) {
          setTrack(data.track);
        }
      } catch (err) {
        setError('Не удалось загрузить текущий трек');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 300000);

    return () => clearInterval(interval);
  }, [track]);

  if (loading) return null;
  if (error) return null;
  if (!track) return null;

  return (
    <div className={css.currentTrack}>
      <div className={css.track}>
        <CiStreamOn className={css.coverIcon} />
        <span className={css.nowPlaying}>Слушаю прямо сейчас:</span>
        <div className={css.marqueeContainer}>
          {`${track.name} — ${track.artist}`}
          {/* <a
            href={track.url}
            target="_blank"
            rel="noreferrer"
            className={css.link}
          >
            {`${track.name} — ${track.artist}`}
          </a> */}
        </div>
      </div>
    </div>
  );
}

export { CurrentTrack };
