import React, { useState, useEffect } from 'react';

const NotificationSystem = () => {
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
    "Hãy đi dạo một chút! 🌿"
  ];

  // Hiển thị thông báo ngẫu nhiên
  const showRandomNotification = () => {
    const randomMessage = reminderMessages[Math.floor(Math.random() * reminderMessages.length)];
    const newNotification = {
      id: Date.now(),
      message: randomMessage,
      timestamp: new Date()
    };

    setNotifications(prev => [...prev, newNotification]);
    setIsVisible(true);

    // Tự động ẩn sau 4 giây
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setNotifications(prev => prev.filter(notif => notif.id !== newNotification.id));
      }, 500); // Đợi animation hoàn thành
    }, 4000);
  };

  // Thiết lập interval để hiển thị thông báo mỗi 30 giây
  useEffect(() => {
    // Hiển thị thông báo đầu tiên sau 5 giây
    const initialTimeout = setTimeout(() => {
      showRandomNotification();
    }, 5000);

    // Sau đó hiển thị mỗi 30 giây
    const interval = setInterval(() => {
      showRandomNotification();
    }, 30000);

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
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
