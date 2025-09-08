# Hướng dẫn sử dụng Sprite Anime Character

## 🎨 Tổng quan

Dự án sử dụng 4 sprite chính để tạo animation cho nhân vật anime girl:
- `stand.png` - Tư thế đứng
- `walk1.png` - Tư thế đi bộ 1
- `walk2.png` - Tư thế đi bộ 2  
- `jump.png` - Tư thế nhảy

## 📁 Cấu trúc file sprite

```
assets/shimeji/
├── stand.png      # 64x64px, nền trong suốt
├── walk1.png      # 64x64px, nền trong suốt
├── walk2.png      # 64x64px, nền trong suốt
├── jump.png       # 64x64px, nền trong suốt
├── stand.svg      # File SVG gốc
├── walk1.svg      # File SVG gốc
├── walk2.svg      # File SVG gốc
├── jump.svg       # File SVG gốc
└── README.md      # Hướng dẫn chi tiết
```

## 🚀 Cách tạo sprite

### Phương pháp 1: Sử dụng script tự động
```bash
# Cài đặt canvas package
npm install canvas

# Tạo sprite từ SVG
npm run create-sprites
```

### Phương pháp 2: Sử dụng online converter
1. Mở file `assets/shimeji/create-sprites.html` trong browser
2. Các sprite sẽ được tự động tải về
3. Copy vào thư mục `assets/shimeji/`

### Phương pháp 3: Chuyển đổi thủ công
1. Sử dụng các file SVG có sẵn
2. Chuyển đổi sang PNG theo hướng dẫn trong `convert-svg-to-png.md`

## 🎯 Yêu cầu kỹ thuật

### Kích thước
- **Width**: 64 pixels
- **Height**: 64 pixels
- **Tỷ lệ**: 1:1 (vuông)

### Định dạng
- **Format**: PNG
- **Nền**: Trong suốt (transparent)
- **Color depth**: 32-bit RGBA

### Chất lượng
- **Style**: Pixel art hoặc vector art
- **Resolution**: Crisp, không blur
- **Consistency**: Cùng phong cách cho tất cả sprite

## 🎭 Phong cách nhân vật

### Đặc điểm chung
- **Phong cách**: Chibi anime girl
- **Tóc**: Dài, màu nâu (#8B4513)
- **Da**: Màu hồng nhạt (#FFB6C1)
- **Mắt**: Đen, tròn
- **Miệng**: Màu hồng (#FF69B4)
- **Váy**: Màu tím nhạt (#DDA0DD)

### Tư thế cụ thể

#### Stand (Đứng)
- Tay buông thả tự nhiên
- Chân đứng thẳng
- Thân người cân đối

#### Walk1 (Đi bộ 1)
- Tay trái đưa ra trước
- Tay phải đưa ra sau
- Chân bước chéo

#### Walk2 (Đi bộ 2)
- Tay phải đưa ra trước
- Tay trái đưa ra sau
- Chân bước chéo ngược lại

#### Jump (Nhảy)
- Tay giơ lên cao
- Chân co lại
- Thân người hơi nghiêng

## 🔧 Tùy chỉnh sprite

### Thay đổi kích thước
Sửa trong `AnimeCharacter.jsx`:
```javascript
// Thay đổi từ w-16 h-16 (64x64px) thành kích thước khác
className="w-20 h-20"  // 80x80px
```

### Thay đổi màu sắc
Sửa trong các file SVG:
```xml
<!-- Thay đổi màu tóc -->
<circle cx="32" cy="18" r="14" fill="#8B4513"/>

<!-- Thay đổi màu da -->
<circle cx="32" cy="20" r="12" fill="#FFB6C1"/>

<!-- Thay đổi màu váy -->
<rect x="26" y="40" width="12" height="8" fill="#DDA0DD"/>
```

### Thêm sprite mới
1. Tạo file SVG mới (ví dụ: `dance.svg`)
2. Chuyển đổi sang PNG
3. Thêm vào object `sprites` trong `AnimeCharacter.jsx`:
```javascript
const sprites = {
  stand: '/assets/shimeji/stand.png',
  walk1: '/assets/shimeji/walk1.png',
  walk2: '/assets/shimeji/walk2.png',
  jump: '/assets/shimeji/jump.png',
  dance: '/assets/shimeji/dance.png'  // Sprite mới
};
```

## 🎨 Nguồn sprite miễn phí

### 1. OpenGameArt.org
- **Link**: https://opengameart.org/
- **Tìm kiếm**: "anime girl sprite", "chibi character"
- **License**: CC0, CC BY, CC BY-SA
- **Chất lượng**: Cao, đa dạng

### 2. Itch.io
- **Link**: https://itch.io/games/free/tag-sprites
- **Tìm kiếm**: "free anime sprites", "chibi character pack"
- **Đặc điểm**: Asset pack hoàn chỉnh
- **License**: Thường miễn phí cho sử dụng cá nhân

### 3. CHARAT
- **Link**: https://charat.me/
- **Đặc điểm**: Tạo nhân vật anime miễn phí
- **Ưu điểm**: Có thể export thành sprite
- **Hạn chế**: Giới hạn customization

### 4. DeviantArt
- **Link**: https://www.deviantart.com/
- **Tìm kiếm**: "free anime sprite", "chibi character free"
- **Lưu ý**: Kiểm tra license cẩn thận
- **Chất lượng**: Rất cao

### 5. Freepik
- **Link**: https://www.freepik.com/
- **Tìm kiếm**: "anime girl sprite", "chibi character"
- **Yêu cầu**: Đăng ký miễn phí
- **License**: Attribution required

## 🛠️ Công cụ tạo sprite

### Miễn phí
- **GIMP**: https://www.gimp.org/
- **Inkscape**: https://inkscape.org/
- **Aseprite**: https://www.aseprite.org/ (có phiên bản miễn phí)
- **Piskel**: https://www.piskelapp.com/ (online)

### Trả phí
- **Photoshop**: https://www.adobe.com/products/photoshop.html
- **Procreate**: https://procreate.art/ (iPad)
- **Aseprite**: https://www.aseprite.org/ (full version)

## 📝 Lưu ý bản quyền

### License phổ biến
- **CC0**: Public domain, sử dụng tự do
- **CC BY**: Attribution required
- **CC BY-SA**: Attribution + ShareAlike
- **MIT**: Sử dụng tự do với attribution

### Best practices
1. Luôn kiểm tra license trước khi sử dụng
2. Ghi nhận tác giả nếu được yêu cầu
3. Không sử dụng sprite có bản quyền thương mại mà không có phép
4. Ưu tiên các sprite có license rõ ràng

## 🐛 Troubleshooting

### Sprite không hiển thị
1. Kiểm tra đường dẫn file
2. Đảm bảo file có định dạng PNG
3. Kiểm tra nền trong suốt
4. Xem console để tìm lỗi loading

### Sprite bị blur
1. Kiểm tra kích thước file
2. Đảm bảo không bị scale
3. Sử dụng nearest neighbor scaling

### Animation không mượt
1. Kiểm tra timing trong code
2. Đảm bảo sprite có cùng kích thước
3. Kiểm tra transition CSS

---

**Lưu ý**: Đảm bảo tuân thủ license của sprite khi sử dụng trong dự án thương mại.
