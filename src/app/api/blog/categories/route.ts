import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/blog';

export async function GET() {
  try {
    const categories = getAllCategories();

    return NextResponse.json({
      categories,
      count: categories.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 },
    );
  }
}
