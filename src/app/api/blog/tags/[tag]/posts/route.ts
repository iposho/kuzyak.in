import { NextResponse } from 'next/server';
import { getPostsByTag } from '@/lib/blog';

export async function GET(
  request: Request,
  { params }: { params: { tag: string } }
) {
  try {
    const tag = decodeURIComponent(params.tag);
    const posts = getPostsByTag(tag);
    
    return NextResponse.json({
      posts,
      tag,
      count: posts.length
    });
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}