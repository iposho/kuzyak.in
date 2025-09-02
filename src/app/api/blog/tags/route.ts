import { NextResponse } from 'next/server';
import { getAllTags } from '@/lib/blog';

export async function GET() {
  try {
    const tags = getAllTags();
    
    return NextResponse.json({
      tags,
      count: tags.length
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}