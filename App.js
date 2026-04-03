import React, { useState, useEffect } from 'react';

const App = () => {
  const [mode, setMode] = useState('glasses');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (t) => t.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

  const apps = [
    { name: 'Instagram', color: '#E1306C', url: 'https://instagram.com' },
    { name: 'WhatsApp', color: '#25D366', url: 'https://web.whatsapp.com' },
    { name: 'Facebook', color: '#1877F2', url: 'https://facebook.com' },
    { name: 'YouTube', color: '#FF0000', url: 'https://youtube.com' },
    { name: 'Weather', color: '#00A1FF', url: 'https://weather.com' },
    { name: 'Yandex', color: '#FF0000', url: 'https://yandex.uz' },
    { name: 'Uzum', color: '#7000FF', url: 'https://uzum.uz' },
    { name: 'Google', color: '#4285F4', url: 'https://google.com' },
    { name: 'Fast.com', color: '#ffffff', url: 'https://fast.com' },
    { name: 'Telegram', color: '#0088cc', url: 'https://web.telegram.org' },
    { name: 'Maps', color: '#34A853', url: 'https://maps.google.com' },
    { name: 'Settings', color: '#8E8E93', url: '#' },
  ];

  // Stil obyektlari (Responsive)
  const s = {
    container: {
      height: '100vh', width: '100vw', backgroundColor: '#000', color: '#fff',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Segoe UI, sans-serif', overflow: 'hidden', padding: '10px'
    },
    // --- GLASSES ---
    glassesWrapper: {
      display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px',
      transform: 'scale(var(--scale, 1))', // Ekran kichrayganda kichrayish uchun
    },
    lens: {
      width: 'clamp(100px, 25vw, 180px)', height: 'clamp(70px, 15vh, 120px)',
      border: '3px solid #333', borderRadius: '10px 10px 40% 40%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,255,255,0.05)', fontSize: 'clamp(10px, 2vw, 16px)'
    },
    navBtn: (bg) => ({
      padding: '10px 15px', backgroundColor: bg, border: 'none', borderRadius: '5px',
      cursor: 'pointer', fontWeight: 'bold', fontSize: '10px', color: bg === '#00ff44' ? '#000' : '#fff'
    }),
    // --- PHONE ---
    phoneFrame: {
      width: 'min(90%, 300px)', height: 'min(90vh, 600px)', border: '8px solid #222',
      borderRadius: '30px', backgroundColor: '#000', position: 'relative', display: 'flex', flexDirection: 'column'
    },
    appIcon: (color) => ({
      width: 'clamp(40px, 12vw, 55px)', height: 'clamp(40px, 12vw, 55px)',
      backgroundColor: color, borderRadius: '12px', display: 'flex',
      alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold'
    })
  };

  return (
    <div style={s.container}>
      <style>
        {`
          @media (max-width: 600px) { :root { --scale: 0.8; } }
          .app-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; padding: 20px; }
          .hover-scale:hover { transform: scale(1.1); transition: 0.2s; }
        `}
      </style>

      {/* 1. GLASSES MODE */}
      {mode === 'glasses' && (
        <div style={{textAlign: 'center'}}>
          <div style={{display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center'}}>
            <button style={s.navBtn('#00ff44')} onClick={() => setMode('phone')}>📱 PHONE</button>
            <button style={s.navBtn('#ff9500')} onClick={() => setMode('watch')}>⌚ WATCH</button>
          </div>
          <div style={s.glassesWrapper}>
            <div style={s.lens}><span>Clouds: 25°C</span></div>
            <div style={{width: '30px', height: '8px', background: '#333'}}></div>
            <div style={s.lens}><span>{formatTime(time)}</span></div>
          </div>
        </div>
      )}

      {/* 2. PHONE MODE */}
      {mode === 'phone' && (
        <div style={s.phoneFrame}>
          <div style={{padding: '10px 20px', display: 'flex', justifyContent: 'space-between', fontSize: '12px'}}>
            <span>{formatTime(time)}</span>
            <span>📶 🔋 98%</span>
          </div>
          <div className="app-grid">
            {apps.map((app, i) => (
              <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px'}}>
                <div 
                  className="hover-scale"
                  style={s.appIcon(app.color)} 
                  onClick={() => app.url !== '#' && window.open(app.url, '_blank')}
                >
                  {app.name[0]}
                </div>
                <span style={{fontSize: '10px'}}>{app.name}</span>
              </div>
            ))}
          </div>
          <div 
            style={{width: '40%', height: '4px', backgroundColor: '#fff', margin: 'auto auto 10px auto', borderRadius: '10px', cursor: 'pointer'}}
            onClick={() => setMode('glasses')}
          ></div>
        </div>
      )}

      {/* 3. WATCH MODE */}
      {mode === 'watch' && (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'scale(1.2)'}}>
          <div style={{width: '80px', height: '40px', background: '#222', borderRadius: '10px 10px 0 0'}}></div>
          <div style={{width: '180px', height: '180px', background: '#111', border: '5px solid #333', borderRadius: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{fontSize: '32px', color: '#ff9500'}}>{formatTime(time)}</span>
            <span style={{fontSize: '10px', color: '#00ff44'}}>Steps: 4,500</span>
            <button onClick={() => setMode('glasses')} style={{marginTop: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px', fontSize: '10px'}}>CLOSE</button>
          </div>
          <div style={{width: '80px', height: '40px', background: '#222', borderRadius: '0 0 10px 10px'}}></div>
        </div>
      )}
    </div>
  );
};

export default App;