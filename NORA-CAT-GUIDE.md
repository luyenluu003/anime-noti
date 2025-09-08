# Nora Cat - Hướng dẫn sử dụng nhân vật

## 🐱 Giới thiệu Nora Cat

**Nora Cat** là nhân vật anime chính trong ứng dụng desktop pet, được tạo bởi **Noraneko Games**. Nhân vật có phong cách chibi dễ thương với nhiều biểu cảm và trang phục khác nhau.

## 🎭 Sprite có sẵn

### Trang phục:
- **Summer Uniform** - Đồng phục mùa hè
- **Casual** - Trang phục thường ngày (đang sử dụng)
- **Winter Uniform** - Đồng phục mùa đông

### Biểu cảm:
- **Closed** - Mắt nhắm
- **Open** - Mắt mở
- **Frown** - Cau mày
- **Smile** - Cười
- **Blush** - Đỏ mặt

## 🎮 Sprite đang sử dụng

Hiện tại ứng dụng sử dụng các sprite từ trang phục **Casual**:

- **stand.png** → `Nora_Cat_Casual_Smile.png` (Tư thế đứng với nụ cười)
- **walk1.png** → `Nora_Cat_Casual_Open.png` (Tư thế đi bộ với mắt mở)
- **walk2.png** → `Nora_Cat_Casual_Open_Blush.png` (Tư thế đi bộ với mắt mở + đỏ mặt)
- **jump.png** → `Nora_Cat_Casual_Smile_Blush.png` (Tư thế nhảy với nụ cười + đỏ mặt)

## 🔄 Thay đổi sprite

### Thay đổi trang phục:
1. Mở thư mục `assets/anime/`
2. Chọn trang phục muốn sử dụng:
   - `Summer Uniform/`
   - `Casual/`
   - `Winter Uniform/`
3. Copy sprite mới vào `assets/shimeji/`

### Ví dụ thay đổi sang Summer Uniform:
```bash
# Copy sprite Summer Uniform
copy "assets\anime\Summer Uniform\Nora_Cat_SummerUni_Smile.png" "assets\shimeji\stand.png"
copy "assets\anime\Summer Uniform\Nora_Cat_SummerUni_Open.png" "assets\shimeji\walk1.png"
copy "assets\anime\Summer Uniform\Nora_Cat_SummerUni_Open_Blush.png" "assets\shimeji\walk2.png"
copy "assets\anime\Summer Uniform\Nora_Cat_SummerUni_Smile_Blush.png" "assets\shimeji\jump.png"
```

### Thay đổi biểu cảm:
Bạn có thể thay đổi biểu cảm bằng cách chọn sprite khác:

- **Frown** - Cau mày (buồn)
- **Smile** - Cười (vui)
- **Open** - Mắt mở (bình thường)
- **Closed** - Mắt nhắm (ngủ)
- **Blush** - Đỏ mặt (ngại ngùng)

## 🎨 Tùy chỉnh nâng cao

### Thay đổi kích thước:
Sửa trong `src/components/AnimeCharacter.jsx`:
```javascript
// Thay đổi từ w-20 h-20 (80x80px) thành kích thước khác
className="w-24 h-24"  // 96x96px
className="w-16 h-16"  // 64x64px
```

### Thay đổi hiệu ứng:
```javascript
// Thay đổi shadow
filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))'

// Thay đổi animation
imageRendering: 'auto'  // hoặc 'pixelated'
```

### Thêm sprite mới:
1. Thêm sprite vào thư mục `assets/shimeji/`
2. Cập nhật object `sprites` trong `AnimeCharacter.jsx`:
```javascript
const sprites = {
  stand: '/assets/shimeji/stand.png',
  walk1: '/assets/shimeji/walk1.png',
  walk2: '/assets/shimeji/walk2.png',
  jump: '/assets/shimeji/jump.png',
  dance: '/assets/shimeji/dance.png'  // Sprite mới
};
```

## 📋 License và Credit

### Noraneko Games License:
- ✅ **Credit required**: "Noraneko Games"
- ✅ **Commercial use**: OK với credit
- ✅ **Modifications**: Allowed (thay đổi màu, pose, etc.)
- ✅ **Game use**: OK
- ✅ **18+ content**: OK (không chứa nội dung bất hợp pháp)

### Credit Information:
- **Artist**: Noraneko Games
- **Twitter**: @NoranekoGames
- **Website**: noranekokgames.itch.io
- **License**: Custom license (xem Rules.txt)

### Cách credit:
1. **In-game credits**: Hiển thị trong game
2. **Website**: Trên trang download
3. **Documentation**: Trong README hoặc file hướng dẫn

## 🎯 Tính năng đặc biệt

### Panel thông tin:
- Click vào nút ℹ️ để xem thông tin nhân vật
- Hiển thị trang phục, biểu cảm, animation
- Credit đầy đủ cho Noraneko Games

### Animation system:
- **Stand**: Tư thế đứng với nụ cười
- **Walk1**: Đi bộ với mắt mở
- **Walk2**: Đi bộ với mắt mở + đỏ mặt
- **Jump**: Nhảy với nụ cười + đỏ mặt

### Tương tác:
- **Click**: Nhảy
- **Hover**: Hiệu ứng highlight
- **Auto move**: Di chuyển ngẫu nhiên
- **Notifications**: Thông báo nhắc nhở

## 🐛 Troubleshooting

### Sprite không hiển thị:
1. Kiểm tra đường dẫn file
2. Đảm bảo file PNG có nền trong suốt
3. Kiểm tra console để xem lỗi loading

### Animation không mượt:
1. Kiểm tra kích thước sprite
2. Đảm bảo tất cả sprite có cùng kích thước
3. Kiểm tra timing trong code

### Performance chậm:
1. Giảm kích thước sprite
2. Tăng interval di chuyển
3. Giảm số lượng animation

---

**Lưu ý**: Đảm bảo tuân thủ license của Noraneko Games khi sử dụng sprite trong dự án thương mại.
