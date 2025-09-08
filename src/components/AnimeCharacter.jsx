import React, { useState, useEffect, useRef } from 'react';

const AnimeCharacter = ({ 
  currentOutfit = 'Casual', 
  hasNotification = false, 
  onCharacterClick,
  onIdleAnimation 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentSprite, setCurrentSprite] = useState('smile');
  const [isExcited, setIsExcited] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const moveIntervalRef = useRef(null);
  const animationIntervalRef = useRef(null);
  const excitedTimeoutRef = useRef(null);
  const notificationTimeoutRef = useRef(null);

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
      // Biểu cảm cơ bản
      smile: `Nora_Cat_${outfitPrefix}_Smile.png`,
      open: `Nora_Cat_${outfitPrefix}_Open.png`,
      frown: `Nora_Cat_${outfitPrefix}_Frown.png`,
      closed: `Nora_Cat_${outfitPrefix}_Closed_Smile.png`,
      
      // Biểu cảm với đỏ mặt
      smileBlush: `Nora_Cat_${outfitPrefix}_Smile_Blush.png`,
      openBlush: `Nora_Cat_${outfitPrefix}_Open_Blush.png`,
      frownBlush: `Nora_Cat_${outfitPrefix}_Frown_Blush.png`,
      closedSmileBlush: `Nora_Cat_${outfitPrefix}_Closed_Smile_Blush.png`,
      
      // Biểu cảm mắt nhắm
      closedFrown: `Nora_Cat_${outfitPrefix}_Closed_Frown.png`,
      closedOpen: `Nora_Cat_${outfitPrefix}_Closed_Open.png`,
      closedFrownBlush: `Nora_Cat_${outfitPrefix}_Closed_Frown_Blush.png`,
      closedOpenBlush: `Nora_Cat_${outfitPrefix}_Closed_Open_Blush.png`
    };
  };

  const spriteNames = getSpriteNames(currentOutfit);
  const sprites = {
    // Biểu cảm cơ bản
    smile: getSpritePath(spriteNames.smile),
    open: getSpritePath(spriteNames.open),
    frown: getSpritePath(spriteNames.frown),
    closed: getSpritePath(spriteNames.closed),
    
    // Biểu cảm với đỏ mặt
    smileBlush: getSpritePath(spriteNames.smileBlush),
    openBlush: getSpritePath(spriteNames.openBlush),
    frownBlush: getSpritePath(spriteNames.frownBlush),
    closedSmileBlush: getSpritePath(spriteNames.closedSmileBlush),
    
    // Biểu cảm mắt nhắm
    closedFrown: getSpritePath(spriteNames.closedFrown),
    closedOpen: getSpritePath(spriteNames.closedOpen),
    closedFrownBlush: getSpritePath(spriteNames.closedFrownBlush),
    closedOpenBlush: getSpritePath(spriteNames.closedOpenBlush)
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
    
    console.log('Character clicked - setting excited state');
    setIsExcited(true);
    
    // Chọn ngẫu nhiên một biểu cảm đỏ mặt
    const blushExpressions = ['smileBlush', 'openBlush', 'closedSmileBlush'];
    const randomBlush = blushExpressions[Math.floor(Math.random() * blushExpressions.length)];
    console.log('Setting sprite to:', randomBlush);
    setCurrentSprite(randomBlush);
    
    excitedTimeoutRef.current = setTimeout(() => {
      console.log('Excitement timeout - returning to normal');
      setIsExcited(false);
      setCurrentSprite('smile');
    }, 5000); // Tăng lên 5 giây
    
    console.log('Set timeout for 5 seconds');
  };

  // Xử lý animation khi có thông báo
  useEffect(() => {
    console.log('Notification effect triggered:', { hasNotification, isExcited });
    if (hasNotification && !isExcited) {
      // Khi có thông báo, chọn ngẫu nhiên biểu cảm vui vẻ
      const happyExpressions = ['open', 'openBlush', 'closedOpen', 'closedOpenBlush', 'closed', 'closedSmileBlush'];
      const randomHappy = happyExpressions[Math.floor(Math.random() * happyExpressions.length)];
      console.log('Notification - setting sprite to:', randomHappy);
      setCurrentSprite(randomHappy);
      
      // Giữ biểu cảm này trong 4 giây
      notificationTimeoutRef.current = setTimeout(() => {
        console.log('Notification timeout - returning to normal');
        setCurrentSprite('smile');
      }, 4000);
    }

    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, [hasNotification, isExcited]);

  // Xử lý click để thay đổi biểu cảm
  const handleCharacterClick = (e) => {
    e.preventDefault();
    
    console.log('Character clicked - triggering audio callback');
    
    // Trigger audio callback trước
    if (onCharacterClick) {
      console.log('Calling onCharacterClick callback');
      onCharacterClick();
    } else {
      console.log('onCharacterClick callback not provided');
    }
    
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
    };
  }, [position]);

  // Cleanup timeouts khi component unmount
  useEffect(() => {
    return () => {
      if (excitedTimeoutRef.current) {
        clearTimeout(excitedTimeoutRef.current);
      }
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  // Animation idle khi không di chuyển
  useEffect(() => {
    if (!isMoving && !isExcited) {
      animationIntervalRef.current = setInterval(() => {
        if (!isMoving && !isExcited) {
          // Thỉnh thoảng thay đổi biểu cảm
          if (Math.random() < 0.4) {
            // Trigger audio cho idle animation
            if (onIdleAnimation) {
              onIdleAnimation();
            }
            
            // Chọn ngẫu nhiên từ nhiều biểu cảm khác nhau
            const idleExpressions = [
              'smile', 'open', 'closed', 'closedOpen', 
              'frown', 'closedFrown'
            ];
            const randomExpression = idleExpressions[Math.floor(Math.random() * idleExpressions.length)];
            setCurrentSprite(randomExpression);
            
            // Thời gian hiển thị biểu cảm ngẫu nhiên (1-3 giây)
            const displayTime = 1000 + Math.random() * 2000;
            setTimeout(() => setCurrentSprite('smile'), displayTime);
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

  console.log('Rendering character with sprite:', currentSprite, 'isExcited:', isExcited, 'hasNotification:', hasNotification);

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
