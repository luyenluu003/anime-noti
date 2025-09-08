import React, { useState, useEffect } from 'react';

const SimpleCharacter = () => {
  const [currentSprite, setCurrentSprite] = useState('stand');
  const [position, setPosition] = useState({ x: 50, y: 50 });

  // Test sprite paths - Direct from anime folder
  const sprites = {
    stand: '/assets/anime/Casual/Nora_Cat_Casual_Smile.png',
    walk1: '/assets/anime/Casual/Nora_Cat_Casual_Open.png',
    walk2: '/assets/anime/Casual/Nora_Cat_Casual_Open_Blush.png',
    jump: '/assets/anime/Casual/Nora_Cat_Casual_Smile_Blush.png'
  };

  // Cycle through sprites for testing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSprite(prev => {
        switch(prev) {
          case 'stand': return 'walk1';
          case 'walk1': return 'walk2';
          case 'walk2': return 'jump';
          case 'jump': return 'stand';
          default: return 'stand';
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Move character randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 150,
        y: Math.random() * 150
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-transparent relative overflow-hidden">
      {/* Debug info */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
        <div>Current Sprite: {currentSprite}</div>
        <div>Position: {position.x.toFixed(0)}, {position.y.toFixed(0)}</div>
        <div>Sprite Path: {sprites[currentSprite]}</div>
      </div>

      {/* Character */}
      <div
        className="absolute cursor-pointer"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 10
        }}
        onClick={() => {
          setCurrentSprite('jump');
          setTimeout(() => setCurrentSprite('stand'), 1000);
        }}
      >
        <img
          src={sprites[currentSprite]}
          alt={`Nora Cat - ${currentSprite}`}
          className="w-20 h-20 object-contain"
          style={{
            imageRendering: 'auto',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))'
          }}
          onLoad={() => console.log(`✅ ${currentSprite} loaded successfully`)}
          onError={(e) => {
            console.error(`❌ ${currentSprite} failed to load:`, e);
            console.error('Sprite path:', sprites[currentSprite]);
          }}
        />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 p-2 rounded text-xs">
        <div>Click character to jump</div>
        <div>Sprites cycle every 1 second</div>
        <div>Character moves every 3 seconds</div>
      </div>
    </div>
  );
};

export default SimpleCharacter;
