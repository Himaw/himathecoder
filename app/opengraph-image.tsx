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
        {/* Dot Grid Background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            zIndex: 0,
          }}
        />

        {/* Minimalist Branding Container */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          zIndex: 1,
          padding: '40px 80px',
          borderRadius: '30px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        }}>
          {/* Pixelated Coin Icon */}
          <div style={{ width: '80px', height: '80px', marginRight: '30px', display: 'flex' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path fill="#6366f1" d="M5 0h6v1h2v1h1v2h1v1h1v6h-1v1h-1v2h-1v1h-2v1H5v-1H3v-1H2v-2H1v-1H0v-6h1v-1h1v-2h1v-1h2z"/>
              <path fill="#ffffff" fillOpacity="0.3" d="M5 1h6v1h2v1h1v2h1v1H11V5H10V3H9V2H5z"/>
              <path fill="#ffffff" d="M4 7l1-1v1l1 1-1 1v1L4 8V7zM11 7l-1-1v1l-1 1 1 1v1l1-1V7zM9 4L7 12h1l2-8H9z"/>
            </svg>
          </div>

          <div style={{ 
            fontSize: '64px', 
            fontWeight: '950', 
            color: 'white', 
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            HIMATHECODER
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
