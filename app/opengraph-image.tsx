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

        {/* Center Text Logo */}
        <div style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          color: 'white', 
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontFamily: 'monospace',
          zIndex: 1
        }}>
          HIMATHECODER
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
