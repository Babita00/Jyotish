import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published') !== 'false';
    
    const posts = await api.getBlogPosts(published);
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title_en', 'title_ne', 'content_en', 'content_ne', 'category'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const post = await api.createBlogPost({
      title_en: body.title_en,
      title_ne: body.title_ne,
      content_en: body.content_en,
      content_ne: body.content_ne,
      excerpt_en: body.excerpt_en,
      excerpt_ne: body.excerpt_ne,
      category: body.category,
      category_ne: body.category_ne,
      featured_image_url: body.featured_image_url,
      is_published: body.is_published || false,
      is_featured: body.is_featured || false,
      author_id: body.author_id
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}