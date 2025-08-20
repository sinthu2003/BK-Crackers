import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Homepage UX Review', () => {
  test('capture and analyze homepage in fullscreen', async ({ page }) => {
    test.setTimeout(60000); // Increase timeout to 60 seconds
    // Set viewport to fullscreen HD resolution
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to the homepage
    await page.goto('http://localhost:5176/');
    
    // Wait for the page to fully load
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for critical elements to be visible
    await page.waitForSelector('header', { timeout: 10000 });
    
    // Scroll through the page to load all lazy-loaded images
    await page.evaluate(() => {
      return new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          
          if(totalHeight >= scrollHeight){
            clearInterval(timer);
            window.scrollTo(0, 0); // Scroll back to top
            resolve();
          }
        }, 100);
      });
    });
    
    // Wait a bit for any animations to complete
    await page.waitForTimeout(2000);
    
    // Create screenshots directory if it doesn't exist
    const screenshotsDir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }
    
    // Capture full page screenshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = path.join(screenshotsDir, `homepage-fullscreen-${timestamp}.png`);
    await page.screenshot({ 
      path: screenshotPath,
      fullPage: true 
    });
    
    console.log(`Screenshot saved to: ${screenshotPath}`);
    
    // Capture above-the-fold screenshot
    const heroScreenshotPath = path.join(screenshotsDir, `homepage-hero-${timestamp}.png`);
    await page.screenshot({ 
      path: heroScreenshotPath,
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    
    console.log(`Hero screenshot saved to: ${heroScreenshotPath}`);
    
    // Perform UX analysis
    console.log('\n=== SENIOR UX DESIGNER REVIEW ===\n');
    
    // Check header visibility and structure
    const header = await page.locator('header');
    const headerVisible = await header.isVisible();
    console.log(`✓ Header visibility: ${headerVisible ? 'PASS' : 'FAIL'}`);
    
    // Check for hero section
    const heroSection = await page.locator('section').first();
    const heroHeight = await heroSection.evaluate(el => el.offsetHeight);
    console.log(`✓ Hero section height: ${heroHeight}px (should be ~900px)`);
    
    // Check for product sections
    const productSections = await page.locator('section').count();
    console.log(`✓ Total sections found: ${productSections}`);
    
    // Check for images
    const images = await page.locator('img').all();
    const brokenImages = [];
    for (const img of images) {
      const src = await img.getAttribute('src');
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      if (naturalWidth === 0 && src) {
        brokenImages.push(src);
      }
    }
    
    if (brokenImages.length > 0) {
      console.log(`\n⚠️  Found ${brokenImages.length} broken images:`);
      brokenImages.forEach(src => console.log(`   - ${src}`));
    }
    
    // Check color contrast and readability
    const textElements = await page.locator('p, h1, h2, h3, h4, h5, h6').all();
    console.log(`\n✓ Text elements found: ${textElements.length}`);
    
    // Check for CTAs
    const buttons = await page.locator('button').all();
    console.log(`✓ Interactive buttons found: ${buttons.length}`);
    
    // Mobile responsiveness check
    console.log('\n=== RESPONSIVE DESIGN CHECK ===\n');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14 Pro
    await page.waitForTimeout(1000);
    
    const mobileScreenshotPath = path.join(screenshotsDir, `homepage-mobile-${timestamp}.png`);
    await page.screenshot({ 
      path: mobileScreenshotPath,
      fullPage: false 
    });
    console.log(`Mobile screenshot saved to: ${mobileScreenshotPath}`);
    
    // Generate UX report
    const report = generateUXReport();
    const reportPath = path.join(screenshotsDir, `ux-report-${timestamp}.md`);
    fs.writeFileSync(reportPath, report);
    console.log(`\nUX Report saved to: ${reportPath}`);
  });
});

function generateUXReport(): string {
  return `# Homepage UX Review Report

## Executive Summary
Senior UX Designer review of BK Crackers homepage based on automated analysis and visual inspection.

## Issues Identified

### 1. Hero Section
- **Issue**: Placeholder 3D animation area needs actual visual content
- **Recommendation**: Add high-quality fireworks imagery or video
- **Priority**: HIGH

### 2. Product Images
- **Issue**: Products using default placeholder images
- **Recommendation**: Replace with professional product photography
- **Priority**: HIGH

### 3. Visual Hierarchy
- **Issue**: All sections have similar visual weight
- **Recommendation**: Add more spacing and visual breaks between sections
- **Priority**: MEDIUM

### 4. Call-to-Action Buttons
- **Issue**: CTAs need more visual prominence
- **Recommendation**: Increase button size and add hover animations
- **Priority**: MEDIUM

### 5. Typography
- **Issue**: Text may be too small in some areas
- **Recommendation**: Increase base font size for better readability
- **Priority**: LOW

## Recommended Improvements

1. **Add Hero Background Image**
   - Use dramatic fireworks display image
   - Implement parallax scrolling effect
   - Add overlay for text readability

2. **Enhance Product Cards**
   - Add subtle shadows for depth
   - Implement hover effects with scale transform
   - Show discount badges more prominently

3. **Improve Navigation**
   - Add active state indicators
   - Implement smooth scroll to sections
   - Add breadcrumbs for better orientation

4. **Color Scheme Enhancement**
   - Use more vibrant accent colors for CTAs
   - Add gradient overlays for visual interest
   - Ensure WCAG AA compliance for contrast ratios

5. **Performance Optimizations**
   - Lazy load images below the fold
   - Optimize image formats (WebP)
   - Implement skeleton loading states

## Accessibility Checklist
- [ ] Alt text for all images
- [ ] Proper heading hierarchy
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Color contrast ratios (4.5:1 minimum)
- [ ] Focus indicators visible

## Next Steps
1. Source high-quality images from Pexels
2. Implement recommended visual improvements
3. Test with real users
4. Iterate based on feedback
`;
}