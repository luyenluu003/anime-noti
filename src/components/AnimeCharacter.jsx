import React, { useState, useEffect, useRef } from 'react';

const AnimeCharacter = ({ currentOutfit = 'Casual' }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentSprite, setCurrentSprite] = useState('smile');
  const [isExcited, setIsExcited] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const moveIntervalRef = useRef(null);
  const animationIntervalRef = useRef(null);
  const excitedTimeoutRef = useRef(null);

  // Sprite configurations - Nora Cat expressions from Noraneko Games
  const getSpritePath = (spriteName, outfit = currentOutfit) => {
    if (window.location.origin === 'file://') {
      // For Electron production mode
      return `./assets/anime/${outfit}/${spriteName}`;
    } else {
      // For development mode
      return `/assets/anime/${outfit}/${spriteName}`;
    }
  };

  // Tạo sprite names dựa trên outfit hiện tại
  const getSpriteNames = (outfit) => {
    const outfitPrefix = outfit === 'Casual' ? 'Casual' : 
                        outfit === 'Summer Uniform' ? 'SummerUni' : 'WinterUni';
    
    return {
      smile: `Nora_Cat_${outfitPrefix}_Smile.png`,
      open: `Nora_Cat_${outfitPrefix}_Open.png`,
      blush: `Nora_Cat_${outfitPrefix}_Smile_Blush.png`,
      frown: `Nora_Cat_${outfitPrefix}_Frown.png`,
      closed: `Nora_Cat_${outfitPrefix}_Closed_Smile.png`
    };
  };

  const spriteNames = getSpriteNames(currentOutfit);
  const sprites = {
    smile: getSpritePath(spriteNames.smile),
    open: getSpritePath(spriteNames.open),
    blush: getSpritePath(spriteNames.blush),
    frown: getSpritePath(spriteNames.frown),
    closed: getSpritePath(spriteNames.closed)
  };

  // Vị trí cố định ở dưới cửa sổ
  const moveArea = {
    width: 0, // Không di chuyển
    height: 0,
    startX: 80, // Vị trí cố định cho cửa sổ nhỏ hơn
    startY: 250 // Đưa xuống thấp hơn một chút
  };

  // Khởi tạo vị trí ban đầu
  useEffect(() => {
    const initialX = moveArea.startX + Math.random() * moveArea.width;
    const initialY = moveArea.startY + Math.random() * moveArea.height;
    setPosition({ x: initialX, y: initialY });
  }, []);

  // Hàm di chuyển ngẫu nhiên
  const startRandomMovement = () => {
    if (moveIntervalRef.current) return;

    moveIntervalRef.current = setInterval(() => {
      if (!isExcited) {
        const newX = moveArea.startX + Math.random() * moveArea.width;
        const newY = moveArea.startY + Math.random() * moveArea.height;
        
        setDirection(newX > position.x ? 1 : -1);
        setIsMoving(true);
        
        // Thay đổi biểu cảm khi di chuyển
        setCurrentSprite('open');
        
        setPosition({ x: newX, y: newY });
        
        setTimeout(() => {
          setIsMoving(false);
          setCurrentSprite('smile');
        }, 1000);
      }
    }, 3000 + Math.random() * 5000); // Di chuyển mỗi 3-8 giây
  };

  // Hàm thay đổi biểu cảm khi click
  const handleClick = () => {
    if (isExcited) return;
    
    setIsExcited(true);
    setCurrentSprite('blush'); // Đỏ mặt khi được click
    
    excitedTimeoutRef.current = setTimeout(() => {
      setIsExcited(false);
      setCurrentSprite('smile');
    }, 1500);
  };

  // Xử lý click để thay đổi biểu cảm
  const handleCharacterClick = (e) => {
    e.preventDefault();
    handleClick();
  };

  // Bắt đầu di chuyển khi component mount
  useEffect(() => {
    startRandomMovement();
    
    return () => {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
      }
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
      if (excitedTimeoutRef.current) {
        clearTimeout(excitedTimeoutRef.current);
      }
    };
  }, [position, isExcited]);

  // Animation idle khi không di chuyển
  useEffect(() => {
    if (!isMoving && !isExcited) {
      animationIntervalRef.current = setInterval(() => {
        if (!isMoving && !isExcited) {
          // Thỉnh thoảng thay đổi biểu cảm
          if (Math.random() < 0.4) {
            const expressions = ['smile', 'open', 'closed'];
            const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
            setCurrentSprite(randomExpression);
            setTimeout(() => setCurrentSprite('smile'), 2000);
          }
        }
      }, 3000 + Math.random() * 4000);
    }

    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, [isMoving, isExcited]);

  return (
    <div
      className="absolute cursor-pointer select-none sprite-transition"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `scaleX(${direction})`,
        zIndex: 10
      }}
      onClick={handleCharacterClick}
    >
      <div className="relative">
        {/* Sprite chính */}
        <img
          src={sprites[currentSprite]}
          alt={`Nora Cat - ${currentSprite}`}
          className={`object-contain w-64 h-64 opacity-100 sprite-transition`}
          style={{
            imageRendering: 'auto',
            filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))'
          }}
          draggable={false}
        />
        
        {/* Hiệu ứng khi hover */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full rounded-full opacity-0 transition-opacity duration-300 bg-anime-pink hover:opacity-20"></div>
        </div>
      </div>
      
      {/* Debug info (chỉ hiển thị trong development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute left-0 -top-8 px-2 py-1 text-xs text-white bg-black bg-opacity-50 rounded">
          {currentSprite} | {isMoving ? 'Moving' : 'Idle'} | {isExcited ? 'Excited' : 'Calm'}
        </div>
      )}
      
      {/* Credit cho Noraneko Games */}
      <div className="absolute left-0 -bottom-6 text-xs text-gray-500 opacity-60 transition-opacity hover:opacity-100">
        Sprite by Noraneko Games
      </div>
    </div>
  );
};

export default AnimeCharacter;
