# 🎭 AI Anime Desktop Pet

<div align="center">
  <img src="assets/anime/Casual/Nora_Cat_Casual_Smile.png" alt="Nora Cat - AI Anime Desktop Pet" width="128" height="128">
  <br>
  <em>Nora Cat - Nhân vật anime desktop pet dễ thương</em>
</div>

Ứng dụng Electron hiển thị nhân vật anime girl 2D ở góc dưới bên phải màn hình với các tính năng tương tác và animation.

## ✨ Tính năng

- 🎭 Nhân vật anime girl 2D **Nora Cat** với phong cách chibi
- 🚶‍♀️ Di chuyển ngẫu nhiên trong khu vực 200x200px
- 🎬 Thay đổi biểu cảm tự nhiên (smile, open, blush, frown, closed)
- 😳 Đỏ mặt khi được click với hiệu ứng pulse
- 💬 Thông báo nhắc nhở ngẫu nhiên mỗi 5 phút
- 🎵 Hệ thống âm thanh anime với voice thật
- 👗 Thay đổi trang phục (Casual, Summer Uniform, Winter Uniform)
- 🪟 Cửa sổ trong suốt, không viền, luôn ở trên cùng
- 🎨 Giao diện React với Tailwind CSS
- ℹ️ Panel thông tin nhân vật với credit đầy đủ
- 🎮 Tương tác: Click để làm nhân vật đỏ mặt và phát âm thanh
- 🔊 Điều khiển âm thanh với nút mute/unmute
- 🎯 Click-through cho vùng trống (có thể click xuyên qua app)

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
│   │   ├── NotificationSystem.jsx # Hệ thống thông báo
│   │   ├── CharacterInfo.jsx     # Panel thông tin nhân vật
│   │   ├── OutfitManager.jsx     # Quản lý trang phục
│   │   └── AudioSystem.jsx       # Hệ thống âm thanh
│   ├── App.jsx                   # App component chính
│   ├── main.jsx                  # Entry point React
│   └── index.css                 # Global styles + Tailwind
├── assets/
│   ├── anime/                   # Thư mục chứa sprite gốc
│   │   ├── Casual/              # Trang phục thường ngày
│   │   ├── Summer Uniform/      # Đồng phục mùa hè
│   │   ├── Winter Uniform/      # Đồng phục mùa đông
│   │   └── Rules.txt            # License của Noraneko Games
│   └── voice/                   # Thư mục chứa file âm thanh
│       ├── click-*.mp3          # Âm thanh click
│       ├── notification-*.mp3   # Âm thanh thông báo
│       ├── idle-*.mp3           # Âm thanh idle
│       └── ...                  # Các âm thanh khác
├── main.js                       # Electron main process
├── preload.js                    # Preload script cho Electron
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
npm run start
```

## 🎮 Hướng dẫn sử dụng

### Các tính năng chính:

1. **Tương tác với nhân vật**:
   - Click vào nhân vật để làm cô ấy đỏ mặt
   - Nhân vật sẽ phát âm thanh anime khi được click
   - Biểu cảm sẽ thay đổi tự động theo thời gian

2. **Thay đổi trang phục**:
   - Click vào nút 👗 ở góc trên bên phải
   - Chọn trang phục: Casual, Summer Uniform, Winter Uniform
   - Nhân vật sẽ thay đổi trang phục ngay lập tức

3. **Điều khiển âm thanh**:
   - Click vào nút 🔊 ở góc dưới bên phải để bật/tắt âm thanh
   - Âm thanh sẽ phát khi:
     - Click vào nhân vật
     - Có thông báo mới
     - Thay đổi trang phục
     - Animation idle

4. **Thông báo nhắc nhở**:
   - Xuất hiện mỗi 5 phút một lần
   - Chứa lời nhắc nhở nghỉ ngơi và chăm sóc sức khỏe
   - Có thể đóng bằng nút ×

5. **Click-through**:
   - Click vào vùng trống để có thể tương tác với các ứng dụng bên dưới
   - Các nút UI vẫn có thể click bình thường

## 🎵 Nguồn âm thanh anime

### 1. Freesound.org
- **Link**: https://freesound.org/
- **Tìm kiếm**: "anime voice", "cute sound", "girl voice"
- **License**: CC0, CC BY
- **Chất lượng**: Cao, đa dạng

### 2. Zapsplat
- **Link**: https://www.zapsplat.com/
- **Tìm kiếm**: "anime sound effects", "cute voice"
- **Yêu cầu**: Đăng ký miễn phí
- **License**: Royalty-free

### 3. Pixabay
- **Link**: https://pixabay.com/sound-effects/
- **Tìm kiếm**: "anime", "cute", "voice"
- **License**: Pixabay License (miễn phí)
- **Chất lượng**: Tốt

### 4. YouTube Audio Library
- **Link**: https://www.youtube.com/audiolibrary/music
- **Đặc điểm**: Miễn phí, không cần attribution
- **Chất lượng**: Cao
- **Hạn chế**: Cần tài khoản Google

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
// Thay đổi từ 300000 (5 phút) thành giá trị khác
setInterval(() => {
  showRandomNotification();
}, 300000); // 300000ms = 5 phút
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

### Thêm âm thanh mới
Thêm file âm thanh vào `assets/voice/` và cập nhật trong `AudioSystem.jsx`:
```javascript
const soundEffects = {
  click: [
    'click-1-384917.mp3',
    'cartoon-jump-6462.mp3',
    // Thêm file âm thanh click khác...
  ],
  notification: [
    'surprise-scared-girl-gasp-149490.mp3',
    // Thêm file âm thanh thông báo khác...
  ],
  // Các loại âm thanh khác...
};
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
