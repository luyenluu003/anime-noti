import React, { useState, useRef } from 'react';
import AnimeCharacter from './components/AnimeCharacter';
import NotificationSystem from './components/NotificationSystem';
import CharacterInfo from './components/CharacterInfo';
import OutfitManager from './components/OutfitManager';
import AudioSystem from './components/AudioSystem';

function App() {
  const [currentOutfit, setCurrentOutfit] = useState('Casual');
  const [hasNotification, setHasNotification] = useState(false);
  
  // Refs cho audio triggers
  const characterClickRef = useRef(0);
  const notificationShowRef = useRef(0);
  const idleAnimationRef = useRef(0);
  const outfitChangeRef = useRef(0);

  const handleOutfitChange = (outfitId) => {
    setCurrentOutfit(outfitId);
    // Trigger audio cho đổi trang phục
    outfitChangeRef.current += 1;
  };

  const handleCloseApp = () => {
    // Gửi signal để đóng ứng dụng
    if (window.electronAPI?.closeApp) {
      window.electronAPI.closeApp();
    } else {
      // Fallback cho development
      window.close();
    }
  };

  const handleNotificationShow = (isShowing) => {
    setHasNotification(isShowing);
    if (isShowing) {
      // Trigger audio cho thông báo
      notificationShowRef.current += 1;
    }
  };

  const handleCharacterClick = () => {
    // Trigger audio cho click character
    characterClickRef.current += 1;
  };

  const handleIdleAnimation = () => {
    // Trigger audio cho idle animation
    idleAnimationRef.current += 1;
  };

  return (
    <div className="overflow-hidden relative w-full h-full bg-transparent">
      <CharacterInfo />
      <AnimeCharacter 
        currentOutfit={currentOutfit} 
        hasNotification={hasNotification}
        onCharacterClick={handleCharacterClick}
        onIdleAnimation={handleIdleAnimation}
      />
      <NotificationSystem onNotificationShow={handleNotificationShow} />
      <OutfitManager 
        onOutfitChange={handleOutfitChange}
        onCloseApp={handleCloseApp}
      />
      <AudioSystem
        onCharacterClick={characterClickRef.current}
        onNotificationShow={notificationShowRef.current}
        onIdleAnimation={idleAnimationRef.current}
        onOutfitChange={outfitChangeRef.current}
      />
    </div>
  );
}

export default App;
