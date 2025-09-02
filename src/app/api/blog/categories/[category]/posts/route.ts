import { NextResponse } from 'next/server';
import { getPostsByCategory } from '@/lib/blog';

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const category = decodeURIComponent(params.category);
    const posts = getPostsByCategory(category);
    
    return NextResponse.json({
      posts,
      category,
      count: posts.length
    });
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}