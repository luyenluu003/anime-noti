# Hướng dẫn cài đặt và chạy dự án

## 🚀 Cài đặt nhanh

### 1. Cài đặt Node.js
- Tải Node.js từ: https://nodejs.org/
- Chọn phiên bản LTS (Long Term Support)
- Cài đặt với tùy chọn mặc định

### 2. Clone hoặc tải dự án
```bash
# Nếu có Git
git clone <repository-url>
cd ai-anime

# Hoặc tải ZIP và giải nén
```

### 3. Cài đặt dependencies
```bash
npm install
```

### 4. Tải sprite anime character

#### Tùy chọn A: Sử dụng sprite có sẵn
1. Tải sprite từ các nguồn miễn phí (xem README.md)
2. Đặt vào thư mục `assets/shimeji/` với tên:
   - `stand.png`
   - `walk1.png`
   - `walk2.png`
   - `jump.png`

#### Tùy chọn B: Tạo sprite từ SVG
1. Mở file `assets/shimeji/create-sprites.html` trong browser
2. Các sprite sẽ được tự động tải về
3. Copy vào thư mục `assets/shimeji/`

#### Tùy chọn C: Chuyển đổi SVG sang PNG
1. Sử dụng các file SVG có sẵn trong `assets/shimeji/`
2. Chuyển đổi sang PNG theo hướng dẫn trong `convert-svg-to-png.md`

### 5. Chạy ứng dụng

#### Development mode:
```bash
npm run dev
```

#### Production mode:
```bash
npm run build
npm start
```

## 🔧 Troubleshooting

### Lỗi "Cannot find module"
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

### Sprite không hiển thị
1. Kiểm tra đường dẫn file trong `assets/shimeji/`
2. Đảm bảo file có định dạng PNG
3. Kiểm tra console để xem lỗi loading

### Cửa sổ không trong suốt
- **Windows**: Kiểm tra cài đặt theme và transparency
- **macOS**: Đảm bảo không có theme tối
- **Linux**: Cài đặt compositor hỗ trợ transparency

### Performance chậm
1. Giảm kích thước sprite
2. Tăng interval di chuyển trong code
3. Giảm số lượng animation

## 📱 Kiểm tra tương thích

### Windows
- Windows 10/11
- .NET Framework 4.7.2+
- Visual C++ Redistributable

### macOS
- macOS 10.14+
- Xcode Command Line Tools

### Linux
- Ubuntu 18.04+
- Debian 9+
- Cài đặt: `sudo apt-get install libnss3-dev libatk-bridge2.0-dev libdrm2 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libxss1 libasound2`

## 🎯 Tùy chỉnh nâng cao

### Thay đổi vị trí cửa sổ
Sửa trong `main.js`:
```javascript
// Thay đổi vị trí cửa sổ
x: width - 250,  // Góc dưới bên phải
y: height - 300,
```

### Thay đổi kích thước nhân vật
Sửa trong `AnimeCharacter.jsx`:
```javascript
// Thay đổi kích thước sprite
className="w-16 h-16"  // 64x64px
```

### Thay đổi tốc độ di chuyển
Sửa trong `AnimeCharacter.jsx`:
```javascript
// Thay đổi interval di chuyển
}, 3000 + Math.random() * 5000); // 3-8 giây
```

### Thêm thông báo mới
Sửa trong `NotificationSystem.jsx`:
```javascript
const reminderMessages = [
  "Nghỉ ngơi chút đi! 😊",
  "Thông báo mới của bạn! 🌟",
  // Thêm thông báo khác...
];
```

## 📦 Build cho production

### Tạo executable
```bash
npm run electron:pack
```

### Tùy chỉnh build
Sửa trong `package.json`:
```json
"build": {
  "appId": "com.ai-anime.desktop-pet",
  "productName": "AI Anime Desktop Pet",
  "directories": {
    "output": "dist-electron"
  },
  "files": [
    "dist/**/*",
    "main.js",
    "package.json"
  ]
}
```

## 🐛 Debug

### Mở DevTools
Trong development mode, DevTools sẽ tự động mở.

### Log errors
Kiểm tra console trong DevTools để xem lỗi.

### Performance monitoring
Sử dụng React DevTools để monitor performance.

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra console errors
2. Đảm bảo tất cả dependencies được cài đặt
3. Kiểm tra sprite files có đúng format
4. Tạo issue trên GitHub với thông tin chi tiết

---

**Lưu ý**: Đảm bảo tuân thủ license của sprite khi sử dụng trong dự án thương mại.
