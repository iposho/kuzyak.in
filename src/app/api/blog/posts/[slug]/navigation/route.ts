import { NextResponse } from 'next/server';
import { getPostNavigation } from '@/lib/blog';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const navigation = getPostNavigation(params.slug);

    return NextResponse.json(navigation);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch navigation' },
      { status: 500 },
    );
  }
}
