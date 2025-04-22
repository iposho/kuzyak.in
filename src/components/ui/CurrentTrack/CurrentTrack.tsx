'use client';

// TODO: Придумать уже, куда его запихать
import { useEffect, useState } from 'react';
import { FaMusic } from 'react-icons/fa';
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
    const interval = setInterval(fetchCurrentTrack, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return null;
  if (error) return null;
  if (!track) return null;

  return (
    <div className={css.currentTrack}>
      <div className={css.track}>
        <FaMusic className={css.coverIcon} />
        <span className={css.nowPlaying}>Слушаю прямо сейчас:</span>
        <div className={css.marqueeContainer}>
          <a
            href={track.url}
            target="_blank"
            rel="noreferrer"
            className={css.link}
          >
            {`${track.name} — ${track.artist}`}
          </a>
        </div>
      </div>
    </div>
  );
}

export { CurrentTrack };
