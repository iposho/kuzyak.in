import { NextResponse } from 'next/server';

const { LASTFM_API_KEY } = process.env;
const { LASTFM_USERNAME } = process.env;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    return NextResponse.json(
      { error: 'Last.fm API не настроен' },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json`,
      {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      },
    );

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(
        { error: data.message },
        { status: 500 },
      );
    }

    const track = data.recenttracks.track[0];

    if (!track || track['@attr']?.nowplaying !== 'true') {
      return NextResponse.json({ track: null });
    }

    return NextResponse.json({
      track: {
        name: track.name,
        artist: track.artist['#text'],
        url: track.url,
        image: track.image[2]['#text'], // Используем средний размер изображения
      },
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при получении данных из Last.fm' },
      { status: 500 },
    );
  }
}
