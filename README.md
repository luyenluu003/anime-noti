# AI Anime Desktop Pet

Ứng dụng Electron hiển thị nhân vật anime girl 2D ở góc dưới bên phải màn hình với các tính năng tương tác và animation.

## ✨ Tính năng

- 🎭 Nhân vật anime girl 2D **Nora Cat** với phong cách chibi
- 🚶‍♀️ Di chuyển ngẫu nhiên trong khu vực 200x200px
- 🎬 Thay đổi biểu cảm tự nhiên (smile, open, blush, frown, closed)
- 😳 Đỏ mặt khi được click với hiệu ứng pulse
- 💬 Thông báo nhắc nhở ngẫu nhiên mỗi 30 giây
- 🪟 Cửa sổ trong suốt, không viền, luôn ở trên cùng
- 🎨 Giao diện React với Tailwind CSS
- ℹ️ Panel thông tin nhân vật với credit đầy đủ
- 🎮 Tương tác: Click để làm nhân vật đỏ mặt

## 🛠️ Công nghệ sử dụng

- **Electron** - Desktop app framework
- **React** - UI library
- **Tailwind CSS** - Styling framework
- **Vite** - Build tool
- **JavaScript/JSX** - Programming language

## 📁 Cấu trúc dự án

```
ai-anime/
├── src/
│   ├── components/
│   │   ├── AnimeCharacter.jsx    # Component nhân vật chính
│   │   └── NotificationSystem.jsx # Hệ thống thông báo
│   ├── App.jsx                   # App component chính
│   ├── main.jsx                  # Entry point React
│   └── index.css                 # Global styles + Tailwind
├── assets/
│   └── anime/                   # Thư mục chứa sprite gốc
│       ├── Casual/              # Trang phục thường ngày
│       ├── Summer Uniform/      # Đồng phục mùa hè
│       ├── Winter Uniform/      # Đồng phục mùa đông
│       └── Rules.txt            # License của Noraneko Games
├── main.js                       # Electron main process
├── package.json                  # Dependencies & scripts
├── vite.config.js               # Vite configuration
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
└── index.html                    # HTML template
```

## 🚀 Cài đặt và chạy

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Sprite anime character

#### Sprite có sẵn (Nora Cat)
Ứng dụng đã bao gồm sprite **Nora Cat** từ Noraneko Games:
- **Casual** - Trang phục thường ngày (đang sử dụng)
- **Summer Uniform** - Đồng phục mùa hè
- **Winter Uniform** - Đồng phục mùa đông

#### Thay đổi sprite
Để thay đổi sprite, sửa trong `src/components/AnimeCharacter.jsx`:
```javascript
const sprites = {
  stand: '/assets/anime/Casual/Nora_Cat_Casual_Smile.png',
  walk1: '/assets/anime/Casual/Nora_Cat_Casual_Open.png',
  walk2: '/assets/anime/Casual/Nora_Cat_Casual_Open_Blush.png',
  jump: '/assets/anime/Casual/Nora_Cat_Casual_Smile_Blush.png'
};
```

### 3. Chạy ứng dụng

#### Development mode:
```bash
npm run dev
```

#### Production mode:
```bash
npm run build
npm start
```

## 🎨 Nguồn sprite miễn phí

### 1. OpenGameArt.org
- **Link**: https://opengameart.org/
- **Tìm kiếm**: "anime girl sprite", "chibi character", "2d character"
- **License**: CC0, CC BY, CC BY-SA
- **Chất lượng**: Cao, đa dạng

### 2. Itch.io
- **Link**: https://itch.io/games/free/tag-sprites
- **Tìm kiếm**: "free anime sprites", "chibi character pack"
- **Đặc điểm**: Asset pack hoàn chỉnh, chất lượng cao
- **License**: Thường là miễn phí cho sử dụng cá nhân

### 3. CHARAT
- **Link**: https://charat.me/
- **Đặc điểm**: Tạo nhân vật anime miễn phí online
- **Ưu điểm**: Có thể export thành sprite
- **Hạn chế**: Giới hạn về customization

### 4. DeviantArt
- **Link**: https://www.deviantart.com/
- **Tìm kiếm**: "free anime sprite", "chibi character free"
- **Lưu ý**: Kiểm tra license cẩn thận
- **Chất lượng**: Rất cao, đa dạng phong cách

### 5. Freepik
- **Link**: https://www.freepik.com/
- **Tìm kiếm**: "anime girl sprite", "chibi character"
- **Yêu cầu**: Đăng ký miễn phí
- **License**: Attribution required

## 🎯 Yêu cầu sprite

- **Định dạng**: PNG với nền trong suốt
- **Kích thước**: 64x64 pixels (hoặc tỷ lệ tương đương)
- **Phong cách**: Chibi anime girl
- **Đặc điểm**: Tóc dài, váy dễ thương
- **Chất lượng**: Pixel art hoặc vector art chất lượng cao

## 🔧 Tùy chỉnh

### Thay đổi khu vực di chuyển
Sửa trong `src/components/AnimeCharacter.jsx`:
```javascript
const moveArea = {
  width: 200,    // Chiều rộng
  height: 200,   // Chiều cao
  startX: 25,    // Offset X
  startY: 50     // Offset Y
};
```

### Thay đổi thời gian thông báo
Sửa trong `src/components/NotificationSystem.jsx`:
```javascript
// Thay đổi từ 30000 (30 giây) thành giá trị khác
setInterval(() => {
  showRandomNotification();
}, 30000);
```

### Thêm thông báo mới
Sửa mảng `reminderMessages` trong `NotificationSystem.jsx`:
```javascript
const reminderMessages = [
  "Nghỉ ngơi chút đi! 😊",
  "Thông báo mới của bạn! 🌟",
  // Thêm thông báo khác...
];
```

## 📱 Tương thích

- ✅ Windows 10/11
- ✅ macOS 10.14+
- ✅ Linux (Ubuntu, Debian, etc.)

## 🐛 Troubleshooting

### Sprite không hiển thị
- Kiểm tra đường dẫn file sprite trong `assets/shimeji/`
- Đảm bảo file có định dạng PNG và nền trong suốt
- Kiểm tra console để xem lỗi loading

### Cửa sổ không trong suốt
- Kiểm tra cài đặt hệ điều hành
- Trên Windows: Đảm bảo không có theme tối
- Trên macOS: Kiểm tra cài đặt transparency

### Performance chậm
- Giảm kích thước sprite
- Tăng interval di chuyển
- Giảm số lượng animation

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy tạo issue trên GitHub hoặc liên hệ qua email.

---

**Lưu ý**: Đảm bảo tuân thủ license của sprite khi sử dụng trong dự án thương mại.
