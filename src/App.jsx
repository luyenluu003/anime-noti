import React from 'react';
import AnimeCharacter from './components/AnimeCharacter';
import NotificationSystem from './components/NotificationSystem';
import CharacterInfo from './components/CharacterInfo';

function App() {
  return (
    <div className="w-full h-full bg-transparent relative overflow-hidden">
      <CharacterInfo />
      <AnimeCharacter />
      <NotificationSystem />
    </div>
  );
}

export default App;
