import React, { useState, useEffect } from 'react';

const NotificationSystem = ({ onNotificationShow }) => {
  const [notifications, setNotifications] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Danh sách thông báo nhắc nhở
  const reminderMessages = [
    "Nghỉ ngơi chút đi! 😊",
    "Đã đến lúc uống nước rồi! 💧",
    "Hãy thư giãn mắt một chút nhé! 👀",
    "Đứng dậy đi lại một chút nào! 🚶‍♀️",
    "Bạn đã làm việc chăm chỉ rồi! 🌟",
    "Hãy nhìn ra cửa sổ và thư giãn! 🌸",
    "Đến giờ nghỉ trưa rồi! 🍱",
    "Hít thở sâu và thư giãn! 🧘‍♀️",
    "Bạn đang làm rất tốt! 💪",
    "Hãy chăm sóc bản thân nhé! 💖",
    "Đã đến lúc nghỉ ngơi rồi! ☕",
    "Hãy nghe nhạc thư giãn! 🎵",
    "Đứng dậy và vươn vai nào! 🤸‍♀️",
    "Bạn cần nghỉ ngơi đấy! 😴",
    "Hãy đi dạo một chút! 🌿",
    "Thời gian nghỉ ngơi đã đến! ⏰",
    "Hãy massage vai một chút! 💆‍♀️",
    "Đã đến lúc ăn nhẹ! 🍎",
    "Hãy tập thể dục mắt! 👁️",
    "Bạn cần nghỉ ngơi ngay! ⚠️",
    "Hãy thư giãn cơ thể! 🧘‍♂️",
    "Đến giờ uống trà! 🍵",
    "Hãy nghe tiếng chim hót! 🐦",
    "Bạn đang làm việc quá nhiều! 😅",
    "Hãy nghỉ ngơi và tận hưởng! 🌺",
    "Đã đến lúc thư giãn! 🌙",
    "Hãy chăm sóc sức khỏe! 🏥",
    "Bạn cần nghỉ ngơi ngay bây giờ! 🚨",
    "Hãy điều chỉnh tư thế ngồi! 🪑",
    "Đến giờ nghỉ ngơi rồi! 🛌"
  ];

  // Hiển thị thông báo ngẫu nhiên
  const showRandomNotification = () => {
    const randomMessage = reminderMessages[Math.floor(Math.random() * reminderMessages.length)];
    const newNotification = {
      id: Date.now(),
      message: randomMessage,
      timestamp: new Date()
    };

    console.log('Showing notification:', newNotification); // Debug log
    setNotifications(prev => [...prev, newNotification]);
    setIsVisible(true);
    
    // Thông báo cho AnimeCharacter về việc có thông báo
    if (onNotificationShow) {
      onNotificationShow(true);
    }

    // Tự động ẩn sau 4 giây
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setNotifications(prev => prev.filter(notif => notif.id !== newNotification.id));
        // Thông báo cho AnimeCharacter về việc hết thông báo
        if (onNotificationShow) {
          onNotificationShow(false);
        }
      }, 500); // Đợi animation hoàn thành
    }, 4000);
  };

  // Thiết lập interval để hiển thị thông báo mỗi 15 giây
  useEffect(() => {
    // Hiển thị thông báo đầu tiên sau 3 giây
    const initialTimeout = setTimeout(() => {
      showRandomNotification();
    }, 3000);

    // Sau đó hiển thị mỗi 15 giây
    const interval = setInterval(() => {
      showRandomNotification();
    }, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification-item ${
            isVisible ? 'notification-enter' : 'notification-exit'
          }`}
        >
          <div className="relative">
            {/* Speech bubble */}
            <div className="p-5 bg-white bg-opacity-95 rounded-lg border border-pink-200 shadow-lg backdrop-blur-sm">
              {/* Nội dung thông báo đơn giản */}
              <div className="text-sm leading-relaxed text-gray-800">
                {notification.message}
              </div>
              
              {/* Thời gian */}
              <div className="mt-3 text-xs text-right text-gray-500">
                {notification.timestamp.toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              
              {/* Nút đóng */}
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => {
                    setNotifications(prev => prev.filter(notif => notif.id !== notification.id));
                  }, 500);
                }}
                className="flex absolute top-1 right-1 justify-center items-center w-4 h-4 text-xs text-gray-600 bg-gray-200 rounded-full transition-colors hover:bg-gray-300"
              >
                ×
              </button>
            </div>
            
            {/* Mũi tên chỉ xuống nhân vật */}
            <div className="absolute left-1/2 transform -translate-x-1/2" style={{top: '100%'}}>
              <div 
                className="w-0 h-0"
                style={{
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent', 
                  borderTop: '15px solid rgba(255, 255, 255, 0.95)',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
