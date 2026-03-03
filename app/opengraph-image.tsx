import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Himasara | Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  const profileImage = 'https://himathecoder.com/img/hima.jpg'; // Assuming the domain for absolute URL in OG

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#09090b',
          fontFamily: 'sans-serif',
          position: 'relative',
          padding: '40px 60px',
        }}
      >
        {/* Dot Grid Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            zIndex: 0,
          }}
        />

        {/* Top Navbar Area */}
        <div style={{ display: 'flex', alignItems: 'center', zIndex: 1, marginBottom: '40px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#6366f1', marginRight: '12px' }} />
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', letterSpacing: '0.05em' }}>HIMATHECODER</div>
        </div>

        {/* Main Content Area */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
          
          {/* Left Text Side */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '55%' }}>
            <div style={{ fontSize: '18px', fontWeight: '500', color: '#6366f1', letterSpacing: '0.4em', marginBottom: '20px', textTransform: 'uppercase' }}>
              Software Engineer
            </div>
            <div style={{ fontSize: '90px', fontWeight: '900', color: 'white', lineHeight: '1.1', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
              Himasara
            </div>
            <div style={{ fontSize: '80px', fontWeight: '900', color: '#a1a1aa', lineHeight: '1', letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '30px' }}>
              Warnakulasuriya
            </div>
            <p style={{ fontSize: '20px', color: '#a1a1aa', lineHeight: '1.6', marginBottom: '40px', maxWidth: '90%' }}>
              I Turn Thoughts into Digital Realities. A passionate software engineer excelling in problem-solving, full-stack innovation, and crafting immersive digital experiences.
            </p>
            <div style={{ 
              display: 'flex', 
              backgroundColor: 'white', 
              color: 'black', 
              padding: '16px 32px', 
              borderRadius: '99px',
              fontSize: '18px',
              fontWeight: 'bold',
              width: 'max-content'
            }}>
              CONNECT ON LINKEDIN
            </div>
          </div>

          {/* Right Image Side */}
          <div style={{ position: 'relative', display: 'flex' }}>
            {/* Main Portrait Frame */}
            <div style={{ 
              width: '420px', 
              height: '500px', 
              borderRadius: '40px', 
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: '#18181b', // Fallback color
              display: 'flex'
            }}>
                <img 
                  src={profileImage}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            {/* Badges */}
            <div style={{
              position: 'absolute',
              top: '40px',
              right: '-30px',
              backgroundColor: '#6366f1',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)'
            }}>
              AI ENTHUSIAST
            </div>

            <div style={{
              position: 'absolute',
              bottom: '60px',
              left: '-40px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              letterSpacing: '0.1em'
            }}>
              FULL STACK DEV
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div style={{ 
          position: 'absolute', 
          bottom: '30px', 
          right: '60px', 
          display: 'flex', 
          alignItems: 'center',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          padding: '8px 16px',
          borderRadius: '12px',
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'white', marginRight: '8px' }}>Bored? Play Tetris</div>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#6366f1', borderRadius: '4px' }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
