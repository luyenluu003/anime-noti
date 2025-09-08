const fs = require('fs');
const path = require('path');

// Simple SVG to PNG converter using canvas
async function createSprites() {
  try {
    // Check if canvas is available
    const { createCanvas, loadImage } = require('canvas');
    
    const spriteTypes = ['stand', 'walk1', 'walk2', 'jump'];
    const assetsDir = path.join(__dirname, '..', 'assets', 'shimeji');
    
    // Ensure assets directory exists
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    
    for (const type of spriteTypes) {
      const svgFile = path.join(assetsDir, `${type}.svg`);
      const pngFile = path.join(assetsDir, `${type}.png`);
      
      if (fs.existsSync(svgFile)) {
        console.log(`Converting ${type}.svg to ${type}.png...`);
        
        // Read SVG content
        const svgContent = fs.readFileSync(svgFile, 'utf8');
        
        // Create canvas
        const canvas = createCanvas(64, 64);
        const ctx = canvas.getContext('2d');
        
        // Convert SVG to PNG
        const img = await loadImage(`data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`);
        ctx.drawImage(img, 0, 0, 64, 64);
        
        // Save PNG
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(pngFile, buffer);
        
        console.log(`✅ Created ${type}.png`);
      } else {
        console.log(`⚠️  ${type}.svg not found, skipping...`);
      }
    }
    
    console.log('🎉 Sprite creation completed!');
    
  } catch (error) {
    console.error('❌ Error creating sprites:', error.message);
    console.log('💡 Install canvas package: npm install canvas');
    console.log('💡 Or use online converter to convert SVG files to PNG');
  }
}

// Run if called directly
if (require.main === module) {
  createSprites();
}

module.exports = createSprites;
