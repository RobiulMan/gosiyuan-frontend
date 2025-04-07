// app/api/og/route.tsx
import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'SufiaShop';
  const description = searchParams.get('description') || 'Premium Mobile Accessories';
  
  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        fontSize: 60,
        color: 'white',
        background: 'linear-gradient(to right, #000000, #333333)',
        width: '100%',
        height: '100%',
        padding: '50px 200px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
        <img 
          src="https://yourdomain.com/logo.png" 
          alt="Logo" 
          width={200} 
          height={200} 
        />
        <h1 style={{ fontSize: 70, margin: '30px 0' }}>{title}</h1>
        <p style={{ fontSize: 40 }}>{description}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}