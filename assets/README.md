# 🎭 Assets Directory

Thư mục chứa tất cả các file tài nguyên cho ứng dụng AI Anime Desktop Pet.

## 📁 Cấu trúc

### 🎨 `anime/` - Sprites nhân vật
- **Nora Cat** - Nhân vật anime chính từ Noraneko Games
- **3 trang phục**: Casual, Summer Uniform, Winter Uniform
- **12 biểu cảm** cho mỗi trang phục:
  - `Smile` - Cười bình thường
  - `Open` - Mở miệng
  - `Closed` - Nhắm mắt
  - `Frown` - Cau mày
  - `Blush` - Đỏ mặt (kết hợp với các biểu cảm khác)

### 🎵 `voice/` - File âm thanh
- **Click sounds** - Âm thanh khi click vào nhân vật
- **Notification sounds** - Âm thanh thông báo
- **Idle sounds** - Âm thanh khi nhân vật idle
- **Outfit change sounds** - Âm thanh đổi trang phục
- **Blush sounds** - Âm thanh xấu hổ
- **Happy sounds** - Âm thanh vui vẻ
- **Anime sounds** - Âm thanh anime đặc biệt

## 📄 License

- **Sprites**: Noraneko Games License (xem `anime/Rules.txt`)
- **Voice files**: Các nguồn miễn phí (Freesound, Pixabay, etc.)

## 🔧 Sử dụng

### Thêm sprite mới:
1. Tạo thư mục mới trong `anime/`
2. Thêm các file PNG với naming convention: `CharacterName_Outfit_Expression.png`
3. Cập nhật `AnimeCharacter.jsx` để load sprite mới

### Thêm âm thanh mới:
1. Thêm file MP3 vào `voice/`
2. Cập nhật `AudioSystem.jsx` để thêm vào danh sách âm thanh
3. Đảm bảo file có chất lượng tốt và kích thước hợp lý

## 📝 Ghi chú

- Tất cả file sprite phải có nền trong suốt (PNG)
- File âm thanh nên có định dạng MP3 để tương thích tốt
- Kích thước file nên được tối ưu để không ảnh hưởng performance
