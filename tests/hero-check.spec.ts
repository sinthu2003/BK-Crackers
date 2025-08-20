import { test } from '@playwright/test';

test('check hero section image', async ({ page }) => {
  console.log('🎆 Checking hero section image...');
  
  await page.goto('http://localhost:5176/', { waitUntil: 'networkidle' });
  
  // Wait for hero section to load
  await page.waitForSelector('section.h-\\[900px\\]', { timeout: 10000 });
  
  // Take screenshot of hero section
  const heroSection = page.locator('section.h-\\[900px\\]');
  await heroSection.screenshot({ path: 'hero-section-current.png' });
  
  // Check if the fireworks image is present
  const fireworksImg = page.locator('img[alt*="Premium Fireworks Collection"]');
  const imgCount = await fireworksImg.count();
  console.log(`🖼️  Found ${imgCount} fireworks image(s)`);
  
  if (imgCount > 0) {
    const imgSrc = await fireworksImg.first().getAttribute('src');
    console.log(`📷 Image source: ${imgSrc}`);
    
    // Check if image is actually loaded
    const imgLoaded = await fireworksImg.first().evaluate((img: HTMLImageElement) => {
      return img.complete && img.naturalHeight > 0;
    });
    console.log(`✅ Image loaded: ${imgLoaded}`);
  }
  
  console.log('🎯 Hero section screenshot saved as hero-section-current.png');
});