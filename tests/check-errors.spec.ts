import { test } from '@playwright/test';

test('check for console errors', async ({ page }) => {
  // Collect all console messages
  const consoleMessages: string[] = [];
  const consoleErrors: string[] = [];
  
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.log('❌ Console Error:', msg.text());
    } else {
      consoleMessages.push(msg.text());
    }
  });
  
  // Navigate to the page
  await page.goto('http://localhost:5176/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  
  // Check what's actually rendered
  const htmlContent = await page.content();
  console.log('\n📄 Page content length:', htmlContent.length);
  
  // Check for sections
  const sections = await page.$$('section');
  console.log('📦 Sections found:', sections.length);
  
  // Check each section's height
  for (let i = 0; i < sections.length; i++) {
    const height = await sections[i].evaluate(el => el.getBoundingClientRect().height);
    const className = await sections[i].evaluate(el => el.className);
    console.log(`   Section ${i + 1}: ${height}px (classes: ${className})`);
  }
  
  // Check for hero section specifically
  const heroSection = await page.$('section.h-\\[900px\\]');
  if (heroSection) {
    const computedHeight = await heroSection.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        height: styles.height,
        display: styles.display,
        visibility: styles.visibility
      };
    });
    console.log('\n🦸 Hero Section Analysis:');
    console.log('   Computed height:', computedHeight.height);
    console.log('   Display:', computedHeight.display);
    console.log('   Visibility:', computedHeight.visibility);
  } else {
    console.log('\n⚠️  Hero section with h-[900px] class not found!');
  }
  
  // Check for any React errors
  const reactRoot = await page.$('#root');
  if (reactRoot) {
    const rootContent = await reactRoot.evaluate(el => el.innerHTML);
    console.log('\n🌳 React root content length:', rootContent.length);
    if (rootContent.length < 100) {
      console.log('⚠️  React app may not be rendering properly!');
    }
  }
  
  if (consoleErrors.length > 0) {
    console.log('\n❌ Total console errors:', consoleErrors.length);
  } else {
    console.log('\n✅ No console errors found');
  }
});