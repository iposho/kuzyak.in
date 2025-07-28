'use client';

import { useEffect, useState } from 'react';
import {
  TbMusic,
  TbBook,
  TbDeviceGamepad2,
  TbExternalLink,
  TbClock,
  TbStar,
  TbTrophy,
} from 'react-icons/tb';

import css from './NowWidget.module.scss';

interface NowPlayingData {
  music: {
    isPlaying: boolean;
    track?: string;
    artist?: string;
    album?: string;
    url?: string;
    playCount?: number;
    duration?: string;
    genre?: string;
    lastPlayed?: string;
  };
  reading: {
    isReading: boolean;
    title?: string;
    author?: string;
    progress?: string;
    status?: string;
    rating?: number;
    totalPages?: number;
    startedDate?: string;
    genre?: string;
  };
  gaming: {
    isPlaying: boolean;
    game?: string;
    platform?: string;
    achievement?: string;
    playTime?: string;
    lastPlayed?: string;
    gamerscore?: number;
  };
}

function NowWidget() {
  const [nowData] = useState<NowPlayingData>({
    music: {
      isPlaying: true,
      track: 'Don\'t Say You Love Me',
      artist: 'Jin',
      album: 'Happy',
      url: 'https://last.fm/music/Jin/_/Don%27t+Say+You+Love+Me',
      playCount: 47,
      duration: '3:42',
      genre: 'K-Pop',
      lastPlayed: '2 минуты назад',
    },
    reading: {
      isReading: true,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      progress: '67%',
      status: 'В процессе',
      rating: 5,
      totalPages: 464,
      startedDate: '15 января',
      genre: 'Программирование',
    },
    gaming: {
      isPlaying: true,
      game: 'Halo Infinite',
      platform: 'Xbox Series X',
      achievement: 'Master Chief',
      playTime: '2ч 34м',
      lastPlayed: 'Сегодня',
      gamerscore: 1250,
    },
  });

  useEffect(() => {
    const fetchNowData = async () => {
      // Placeholder for future integrations
    };

    fetchNowData();
    const interval = setInterval(fetchNowData, 30000);

    return () => clearInterval(interval);
  }, []);

  const { music, reading, gaming } = nowData;
  const hideWidget = !music.isPlaying && !reading.isReading && !gaming.isPlaying;

  if (hideWidget) return null;

  return (
    <div className={css.nowWidget}>
      <div className={css.liveBadge}>
        <span className={css.liveDot} />
        <span>LIVE</span>
      </div>
      <div className={css.cards}>
        <div className={css.card}>
          <div className={css.cardIcon}>
            <TbMusic className={music.isPlaying ? css.musicIconActive : css.iconMuted} />
          </div>
          <div className={css.cardContent}>
            <div className={css.cardTitle}>{music.isPlaying ? music.track : 'Ничего не играет'}</div>
            {music.isPlaying && (
              <div className={css.cardDetails}>
                <span className={css.cardSubtitle}>{`${music.artist} • ${music.album}`}</span>
                <div className={css.infoRow}>
                  <span className={css.infoItem}>
                    <TbClock className={css.infoIcon} />
                    {music.duration}
                  </span>
                  <span className={css.infoItem}>{music.genre}</span>
                </div>
                <div className={css.infoRow}>
                  <span className={css.infoItem}>{`Прослушиваний: ${music.playCount}`}</span>
                  <span className={css.infoItem}>{music.lastPlayed}</span>
                </div>
                {music.url && (
                  <a href={music.url} target="_blank" rel="noreferrer" className={css.link}>
                    Открыть в Last.fm
                    <TbExternalLink className={css.infoIcon} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={css.card}>
          <div className={css.cardIcon}>
            <TbBook className={reading.isReading ? css.bookIconActive : css.iconMuted} />
          </div>
          <div className={css.cardContent}>
            <div className={css.cardTitle}>{reading.isReading ? reading.title : 'Ничего не читаю'}</div>
            {reading.isReading && (
              <div className={css.cardDetails}>
                <span className={css.cardSubtitle}>{reading.author}</span>
                <div className={css.progressBar}>
                  <div className={css.progress} style={{ width: reading.progress }} />
                </div>
                <div className={css.infoRow}>
                  <span className={css.infoItem}>
                    <TbStar className={css.infoIconFilled} />
                    {`${reading.rating}/5`}
                  </span>
                  <span className={css.infoItem}>{reading.genre}</span>
                </div>
                <div className={css.infoRow}>
                  <span className={css.infoItem}>{`${reading.totalPages} страниц`}</span>
                  <span className={css.infoItem}>{`Начал ${reading.startedDate}`}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={css.card}>
          <div className={css.cardIcon}>
            <TbDeviceGamepad2 className={gaming.isPlaying ? css.gameIconActive : css.iconMuted} />
          </div>
          <div className={css.cardContent}>
            <div className={css.cardTitle}>{gaming.isPlaying ? gaming.game : 'Не играю'}</div>
            {gaming.isPlaying && (
              <div className={css.cardDetails}>
                <span className={css.cardSubtitle}>{gaming.platform}</span>
                {gaming.achievement && (
                  <div className={css.infoRow}>
                    <TbTrophy className={css.infoIconGame} />
                    {gaming.achievement}
                  </div>
                )}
                <div className={css.infoRow}>
                  <span className={css.infoItem}>{`Время в игре: ${gaming.playTime}`}</span>
                  <span className={css.infoItem}>{gaming.lastPlayed}</span>
                </div>
                <div className={css.infoRow}>{`Gamerscore: ${gaming.gamerscore}`}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={css.updated}>Обновлено несколько секунд назад</div>
    </div>
  );
}

export { NowWidget };
