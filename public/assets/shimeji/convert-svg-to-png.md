# Hướng dẫn chuyển đổi SVG sang PNG

## Cách 1: Sử dụng online converter

### 1. SVG to PNG Converter
- **Link**: https://convertio.co/svg-png/
- **Cách sử dụng**:
  1. Upload file SVG
  2. Chọn kích thước 64x64 pixels
  3. Download file PNG

### 2. CloudConvert
- **Link**: https://cloudconvert.com/svg-to-png
- **Cách sử dụng**:
  1. Upload file SVG
  2. Chọn format PNG
  3. Set width: 64, height: 64
  4. Download

## Cách 2: Sử dụng GIMP (miễn phí)

1. Mở GIMP
2. File → Open → Chọn file SVG
3. Chọn kích thước 64x64 pixels
4. File → Export As → Chọn PNG
5. Export

## Cách 3: Sử dụng Inkscape (miễn phí)

1. Mở Inkscape
2. File → Open → Chọn file SVG
3. File → Export PNG Image
4. Set width: 64, height: 64
5. Export

## Cách 4: Sử dụng command line (ImageMagick)

```bash
# Cài đặt ImageMagick
# Windows: choco install imagemagick
# macOS: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Chuyển đổi
magick stand.svg -resize 64x64 stand.png
magick walk1.svg -resize 64x64 walk1.png
magick walk2.svg -resize 64x64 walk2.png
magick jump.svg -resize 64x64 jump.png
```

## Cách 5: Sử dụng Node.js script

Tạo file `convert-sprites.js`:

```javascript
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function convertSvgToPng(svgFile, pngFile) {
  // Đọc SVG content
  const svgContent = fs.readFileSync(svgFile, 'utf8');
  
  // Tạo canvas
  const canvas = createCanvas(64, 64);
  const ctx = canvas.getContext('2d');
  
  // Convert SVG to PNG
  const img = await loadImage(`data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`);
  ctx.drawImage(img, 0, 0, 64, 64);
  
  // Save PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(pngFile, buffer);
}

// Convert all sprites
convertSvgToPng('stand.svg', 'stand.png');
convertSvgToPng('walk1.svg', 'walk1.png');
convertSvgToPng('walk2.svg', 'walk2.png');
convertSvgToPng('jump.svg', 'jump.png');
```

Chạy script:
```bash
npm install canvas
node convert-sprites.js
```

## Lưu ý quan trọng

1. **Kích thước**: Đảm bảo output là 64x64 pixels
2. **Nền trong suốt**: SVG đã có nền trong suốt, PNG cũng sẽ có
3. **Chất lượng**: Sử dụng nearest neighbor scaling để giữ pixel art style
4. **Tên file**: Đặt tên chính xác: stand.png, walk1.png, walk2.png, jump.png

## Kiểm tra kết quả

Sau khi chuyển đổi, kiểm tra:
- File có kích thước 64x64 pixels
- Nền trong suốt
- Chất lượng hình ảnh tốt
- Tên file đúng format
