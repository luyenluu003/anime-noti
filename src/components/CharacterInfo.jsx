import React, { useState } from 'react';

const CharacterInfo = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="absolute top-2 left-2 z-30">
      {/* Nút hiển thị thông tin */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-300"
        title="Thông tin nhân vật"
      >
        <span className="text-lg">ℹ️</span>
      </button>

      {/* Panel thông tin */}
      {isVisible && (
        <div className="absolute top-12 left-0 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg border border-anime-pink border-opacity-30 p-4 min-w-64">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-anime-pink to-anime-purple rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🐱</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Nora Cat</h3>
              <p className="text-sm text-gray-600">Anime Desktop Pet</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Trang phục:</span>
              <span className="font-medium">Casual</span>
            </div>
            <div className="flex justify-between">
              <span>Biểu cảm:</span>
              <span className="font-medium">Smile, Open, Blush</span>
            </div>
            <div className="flex justify-between">
              <span>Animation:</span>
              <span className="font-medium">Stand, Walk, Jump</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <p className="font-medium mb-1">Sprite Credits:</p>
              <p>• Noraneko Games</p>
              <p>• @NoranekoGames on Twitter</p>
              <p>• noranekokgames.itch.io</p>
            </div>
          </div>
          
          {/* Nút đóng */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm transition-colors"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterInfo;
