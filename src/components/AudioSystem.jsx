import React, { useState, useEffect, useRef } from 'react';

const AudioSystem = ({ 
  onCharacterClick, 
  onNotificationShow, 
  onIdleAnimation,
  onOutfitChange 
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRefs = useRef({});

  // Danh sách âm thanh anime từ file thật
  const soundEffects = {
    // Âm thanh khi click
    click: [
      'click-1-384917.mp3',
      'cartoon-jump-6462.mp3',
      'weee-337908.mp3'
    ],
    
    // Âm thanh khi có thông báo
    notification: [
      'surprise-scared-girl-gasp-149490.mp3',
      'girl-says-aaaa-to-open-her-mouth-48174.mp3',
      'uhmmp3-14868.mp3'
    ],
    
    // Âm thanh idle (thỉnh thoảng)
    idle: [
      'girl-sighs-80765.mp3',
      'female-sigh-149495.mp3',
      'small-coughing-96728.mp3',
      'mmm-girl-1-106172.mp3'
    ],
    
    // Âm thanh đổi trang phục
    outfitChange: [
      'ara-ara-242755.mp3',
      'ara-ara-sound-effect-127279.mp3',
      'se-no-139473.mp3'
    ],
    
    // Âm thanh xấu hổ (blush)
    blush: [
      'girl-giggle-105389.mp3',
      'girl-chucklewav-14669.mp3',
      'mmm-girl-3-89246.mp3',
      'kawai-139470.mp3'
    ],
    
    // Âm thanh vui vẻ
    happy: [
      'girl-laughing-and-chuckling-25453.mp3',
      'cute-character-wee-4-188164.mp3',
      'Nyaa.mp3'
    ],
    
    // Âm thanh anime đặc biệt
    anime: [
      'arigato-37624.mp3',
      'senpai-37623.mp3',
      'onii-chan-187125.mp3',
      'yada-yada-95178.mp3'
    ]
  };

  // Phát âm thanh từ file thật
  const playSound = (soundType, shouldStopOthers = true) => {
    console.log('playSound called:', soundType, 'isMuted:', isMuted, 'audioEnabled:', audioEnabled, 'shouldStopOthers:', shouldStopOthers);
    
    if (isMuted || !audioEnabled) {
      console.log('Audio is muted or not enabled, skipping');
      return;
    }
    
    // Luôn dừng tất cả âm thanh cũ trước khi phát âm thanh mới
    Object.values(audioRefs.current).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    audioRefs.current = {};
    
    const soundList = soundEffects[soundType];
    if (!soundList || soundList.length === 0) {
      console.log('No sound list found for type:', soundType);
      return;
    }
    
    // Chọn ngẫu nhiên một âm thanh từ danh sách
    const randomSound = soundList[Math.floor(Math.random() * soundList.length)];
    console.log('Selected sound:', randomSound);
    
    // Xác định đường dẫn dựa trên môi trường
    let audioPath;
    if (window.location.origin === 'file://') {
      // For Electron production mode
      audioPath = `./assets/voice/${randomSound}`;
    } else {
      // For development mode - thử cả 2 cách
      audioPath = `/assets/voice/${randomSound}`;
    }
    
    // Thử đường dẫn khác nếu cần
    const alternativePath = `./assets/voice/${randomSound}`;
    console.log('Alternative path:', alternativePath);
    
    console.log('Audio path:', audioPath);
    
    const tryPlayAudio = (path) => {
      try {
        // Tạo audio element mới mỗi lần phát
        const audio = new Audio(path);
        audio.volume = volume;
        
        console.log('Attempting to play audio with volume:', volume, 'path:', path);
        
        return audio.play().then(() => {
          console.log('Audio played successfully:', randomSound, 'from path:', path);
          return audio;
        }).catch(error => {
          console.log('Audio play failed for path:', path, 'error:', error);
          throw error;
        });
      } catch (error) {
        console.log('Audio not supported for path:', path, 'error:', error);
        return Promise.reject(error);
      }
    };
    
    // Thử đường dẫn chính trước
    tryPlayAudio(audioPath)
      .then((audio) => {
        // Lưu reference để có thể dừng nếu cần
        const audioId = Date.now();
        audioRefs.current[audioId] = audio;
        
        // Tự động xóa reference sau khi phát xong
        audio.onended = () => {
          console.log('Audio ended:', randomSound);
          delete audioRefs.current[audioId];
        };
      })
      .catch(() => {
        // Nếu đường dẫn chính thất bại, thử đường dẫn thay thế
        console.log('Trying alternative path:', alternativePath);
        tryPlayAudio(alternativePath)
          .then((audio) => {
            // Lưu reference để có thể dừng nếu cần
            const audioId = Date.now();
            audioRefs.current[audioId] = audio;
            
            // Tự động xóa reference sau khi phát xong
            audio.onended = () => {
              console.log('Audio ended:', randomSound);
              delete audioRefs.current[audioId];
            };
          })
          .catch((error) => {
            console.log('Both audio paths failed:', error);
          });
      });
  };

  // Xử lý các sự kiện âm thanh
  useEffect(() => {
    console.log('AudioSystem - onCharacterClick changed:', onCharacterClick);
    if (onCharacterClick) {
      console.log('Playing character click sounds');
      // Chỉ phát 1 âm thanh click đơn giản
      playSound('click');
    }
  }, [onCharacterClick]);

  useEffect(() => {
    if (onNotificationShow) {
      // Chỉ phát âm thanh thông báo đơn giản
      playSound('notification');
    }
  }, [onNotificationShow]);

  useEffect(() => {
    if (onIdleAnimation) {
      // Phát âm thanh idle nhẹ nhàng
      playSound('idle');
    }
  }, [onIdleAnimation]);

  useEffect(() => {
    if (onOutfitChange) {
      // Chỉ phát âm thanh đổi trang phục đơn giản
      playSound('outfitChange');
    }
  }, [onOutfitChange]);

  // Toggle mute
  const toggleMute = () => {
    if (!audioEnabled) {
      // Enable audio on first click
      setAudioEnabled(true);
      console.log('Audio enabled by user interaction');
    }
    setIsMuted(!isMuted);
  };

  // Thay đổi volume
  const handleVolumeChange = (e) => {
    if (!audioEnabled) {
      setAudioEnabled(true);
      console.log('Audio enabled by volume change');
    }
    setVolume(parseFloat(e.target.value));
  };

  // Tự động phát âm thanh idle khi không có thông báo
  useEffect(() => {
    let idleInterval;
    
    if (!isMuted && audioEnabled) {
      // Phát âm thanh idle mỗi 10-15 giây
      idleInterval = setInterval(() => {
        if (!isMuted && audioEnabled) {
          playSound('idle');
        }
      }, 10000 + Math.random() * 5000); // 10-15 giây
    }
    
    return () => {
      if (idleInterval) {
        clearInterval(idleInterval);
      }
    };
  }, [isMuted, audioEnabled]);

  return (
    <div className="audio-controls">
      {/* Nút enable audio nếu chưa enable */}
      {!audioEnabled && (
        <button
          onClick={() => setAudioEnabled(true)}
          className="audio-btn"
          title="Bật âm thanh"
        >
          🔊
        </button>
      )}
      
      {/* Nút mute/unmute */}
      {audioEnabled && (
        <button
          onClick={toggleMute}
          className={`audio-btn ${isMuted ? 'muted' : ''}`}
          title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      )}
    </div>
  );
};

export default AudioSystem;
