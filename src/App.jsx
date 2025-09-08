import React, { useState } from 'react';
import AnimeCharacter from './components/AnimeCharacter';
import NotificationSystem from './components/NotificationSystem';
import CharacterInfo from './components/CharacterInfo';
import OutfitManager from './components/OutfitManager';

function App() {
  const [currentOutfit, setCurrentOutfit] = useState('Casual');
  const [hasNotification, setHasNotification] = useState(false);

  const handleOutfitChange = (outfitId) => {
    setCurrentOutfit(outfitId);
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
  };

  return (
    <div className="overflow-hidden relative w-full h-full bg-transparent">
      <CharacterInfo />
      <AnimeCharacter 
        currentOutfit={currentOutfit} 
        hasNotification={hasNotification}
      />
      <NotificationSystem onNotificationShow={handleNotificationShow} />
      <OutfitManager 
        onOutfitChange={handleOutfitChange}
        onCloseApp={handleCloseApp}
      />
    </div>
  );
}

export default App;
