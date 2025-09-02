import { NextRequest, NextResponse } from 'next/server';
import { getPostsByTagPaginated } from '@/lib/blog';

export async function GET(
  request: NextRequest,
  { params }: { params: { tag: string } },
) {
  try {
    const tag = decodeURIComponent(params.tag);
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '6', 10);

    // Validate parameters
    if (page < 1 || limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters' },
        { status: 400 },
      );
    }

    const result = getPostsByTagPaginated(tag, page, limit);

    return NextResponse.json({
      posts: result.posts,
      tag,
      pagination: {
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalPosts: result.totalPosts,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
        limit,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts by tag' },
      { status: 500 },
    );
  }
}
