import React, { useState } from 'react';
import AnimeCharacter from './components/AnimeCharacter';
import NotificationSystem from './components/NotificationSystem';
import CharacterInfo from './components/CharacterInfo';
import OutfitManager from './components/OutfitManager';

function App() {
  const [currentOutfit, setCurrentOutfit] = useState('Casual');

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

  return (
    <div className="overflow-hidden relative w-full h-full bg-transparent">
      <CharacterInfo />
      <AnimeCharacter currentOutfit={currentOutfit} />
      <NotificationSystem />
      <OutfitManager 
        onOutfitChange={handleOutfitChange}
        onCloseApp={handleCloseApp}
      />
    </div>
  );
}

export default App;
