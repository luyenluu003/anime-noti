import React, { useState } from 'react';

const OutfitManager = ({ onOutfitChange, onCloseApp }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentOutfit, setCurrentOutfit] = useState('Casual');

  const outfits = [
    { id: 'Casual', name: 'Thường ngày', icon: '👕' },
    { id: 'Summer Uniform', name: 'Đồng phục hè', icon: '☀️' },
    { id: 'Winter Uniform', name: 'Đồng phục đông', icon: '❄️' }
  ];

  const handleOutfitSelect = (outfitId) => {
    setCurrentOutfit(outfitId);
    onOutfitChange(outfitId);
    setIsMenuOpen(false);
  };

  const handleCloseApp = () => {
    onCloseApp();
  };

  return (
    <div className="outfit-manager">
      {/* Nút menu trang phục */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="outfit-menu-btn"
        title="Đổi trang phục"
      >
        <span className="outfit-icon">👗</span>
      </button>

      {/* Menu trang phục */}
      {isMenuOpen && (
        <div className="outfit-menu">
          <div className="outfit-menu-header">
            <span className="outfit-menu-title">Chọn trang phục</span>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="outfit-menu-close"
            >
              ×
            </button>
          </div>
          
          <div className="outfit-list">
            {outfits.map((outfit) => (
              <button
                key={outfit.id}
                onClick={() => handleOutfitSelect(outfit.id)}
                className={`outfit-item ${currentOutfit === outfit.id ? 'active' : ''}`}
              >
                <span className="outfit-item-icon">{outfit.icon}</span>
                <span className="outfit-item-name">{outfit.name}</span>
                {currentOutfit === outfit.id && (
                  <span className="outfit-item-check">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Nút đóng ứng dụng */}
      <button
        onClick={handleCloseApp}
        className="close-app-btn"
        title="Đóng ứng dụng"
      >
        <span className="close-icon">✕</span>
      </button>
    </div>
  );
};

export default OutfitManager;
