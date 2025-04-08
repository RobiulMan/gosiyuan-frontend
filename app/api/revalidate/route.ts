// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Verify webhook secret if you have one
  const body = await request.json();
  console.log( 'Webhook body:', body);
  // Check which content type was updated
  if (body.model === 'product') {
    revalidateTag('products');
  }
  
  if (body.model === 'category') {
    revalidateTag('categories');
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}