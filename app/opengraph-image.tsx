import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Himasara | Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background Grid Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.1,
          }}
        />

        {/* Glossy Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 80px',
            borderRadius: '40px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '2px solid rgba(99, 102, 241, 0.2)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
          }}
        >
          {/* Pixelated Coin Icon in OG Image */}
          <div
            style={{
              width: '160px',
              height: '160px',
              display: 'flex',
              marginBottom: '40px',
              position: 'relative',
            }}
          >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path fill="#6366f1" d="M5 0h6v1h2v1h1v2h1v1h1v6h-1v1h-1v2h-1v1h-2v1H5v-1H3v-1H2v-2H1v-1H0v-6h1v-1h1v-2h1v-1h2z"/>
                <path fill="#ffffff" fillOpacity="0.3" d="M5 1h6v1h2v1h1v2h1v1H11V5H10V3H9V2H5z"/>
                <path fill="#ffffff" d="M4 7l1-1v1l1 1-1 1v1L4 8V7zM11 7l-1-1v1l-1 1 1 1v1l1-1V7zM9 4L7 12h1l2-8H9z"/>
             </svg>
             {/* Glow behind icon */}
             <div style={{ position: 'absolute', inset: -40, background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)', zIndex: -1 }} />
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-0.04em',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Hima<span style={{ color: '#6366f1' }}>TheCoder</span>
          </div>
          
          <div
            style={{
              fontSize: 22,
              color: '#a1a1aa',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginTop: '15px',
            }}
          >
            Software Engineer & Innovator
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
