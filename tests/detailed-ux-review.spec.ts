import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Detailed Homepage UX Review', () => {
  test('capture and analyze entire homepage section by section', async ({ page }) => {
    test.setTimeout(120000); // 2 minutes timeout
    
    // Set viewport to standard desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to homepage
    console.log('📱 Navigating to homepage...');
    await page.goto('http://localhost:5176/', { waitUntil: 'domcontentloaded' });
    
    // Wait for initial render
    await page.waitForTimeout(3000);
    
    // Create screenshots directory
    const screenshotsDir = path.join(process.cwd(), 'ux-review');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    const sessionDir = path.join(screenshotsDir, timestamp);
    fs.mkdirSync(sessionDir);
    
    console.log('\n🎨 === SENIOR UX DESIGNER REVIEW SESSION ===\n');
    console.log(`📁 Screenshots saved to: ${sessionDir}\n`);
    
    // Capture initial viewport (above the fold)
    await captureAndAnalyze(page, sessionDir, '01-initial-view', 0);
    
    // Get page height
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log(`📏 Total page height: ${pageHeight}px\n`);
    
    // Analyze header and navigation
    await analyzeHeader(page);
    
    // Scroll and capture each section
    const sections = [
      { name: 'news-section', scroll: 65 },
      { name: 'hero-section', scroll: 120 },
      { name: 'featured-products', scroll: 1020 },
      { name: 'new-arrivals', scroll: 2010 },
      { name: 'special-items', scroll: 3000 },
      { name: 'footer', scroll: pageHeight - 1080 }
    ];
    
    for (const section of sections) {
      if (section.scroll < pageHeight) {
        await page.evaluate((scrollY) => window.scrollTo(0, scrollY), section.scroll);
        await page.waitForTimeout(1000);
        await captureAndAnalyze(page, sessionDir, section.name, section.scroll);
      }
    }
    
    // Capture full page
    console.log('\n📸 Capturing full page screenshot...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    const fullPagePath = path.join(sessionDir, '00-full-page.png');
    await page.screenshot({ path: fullPagePath, fullPage: true });
    
    // Generate comprehensive UX report
    const issues = await performDetailedAnalysis(page);
    const report = generateDetailedUXReport(issues);
    fs.writeFileSync(path.join(sessionDir, 'ux-report.md'), report);
    
    console.log('\n✅ UX Review Complete!');
    console.log(`📄 Report saved to: ${path.join(sessionDir, 'ux-report.md')}`);
  });
});

async function captureAndAnalyze(page: any, dir: string, name: string, scrollY: number) {
  const screenshotPath = path.join(dir, `${name}.png`);
  await page.screenshot({ path: screenshotPath });
  console.log(`📸 Captured: ${name} (scroll: ${scrollY}px)`);
  
  // Analyze visible elements
  const analysis = await page.evaluate(() => {
    const visibleElements = {
      buttons: document.querySelectorAll('button:not([style*="display: none"])').length,
      links: document.querySelectorAll('a:not([style*="display: none"])').length,
      images: document.querySelectorAll('img:not([style*="display: none"])').length,
      headings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
      sections: document.querySelectorAll('section').length
    };
    
    // Check for common issues
    const issues = [];
    
    // Check images
    const images = document.querySelectorAll('img');
    images.forEach((img: HTMLImageElement) => {
      if (img.naturalWidth === 0) {
        issues.push(`Broken image: ${img.src}`);
      }
    });
    
    // Check text contrast
    const textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6');
    textElements.forEach((el: Element) => {
      const styles = window.getComputedStyle(el);
      const fontSize = parseFloat(styles.fontSize);
      if (fontSize < 12) {
        issues.push(`Text too small (${fontSize}px): ${el.textContent?.substring(0, 50)}`);
      }
    });
    
    return { visibleElements, issues };
  });
  
  console.log(`   📊 Elements: ${analysis.visibleElements.buttons} buttons, ${analysis.visibleElements.links} links, ${analysis.visibleElements.images} images`);
  
  if (analysis.issues.length > 0) {
    console.log(`   ⚠️  Issues found:`);
    analysis.issues.forEach((issue: string) => console.log(`      - ${issue}`));
  }
}

async function analyzeHeader(page: any) {
  console.log('\n🔍 Analyzing Header...');
  
  const headerAnalysis = await page.evaluate(() => {
    const header = document.querySelector('header');
    if (!header) return { exists: false };
    
    const rect = header.getBoundingClientRect();
    const styles = window.getComputedStyle(header);
    
    return {
      exists: true,
      height: rect.height,
      isSticky: styles.position === 'sticky' || styles.position === 'fixed',
      zIndex: styles.zIndex,
      backgroundColor: styles.backgroundColor
    };
  });
  
  console.log(`   Height: ${headerAnalysis.height}px`);
  console.log(`   Sticky: ${headerAnalysis.isSticky ? '✅' : '❌'}`);
  console.log(`   Z-Index: ${headerAnalysis.zIndex}`);
}

async function performDetailedAnalysis(page: any) {
  console.log('\n🔎 Performing detailed analysis...');
  
  const issues = await page.evaluate(() => {
    const problems = [];
    
    // Check hero section
    const heroSection = document.querySelector('section');
    if (heroSection) {
      const heroHeight = heroSection.offsetHeight;
      if (heroHeight < 600) {
        problems.push({
          severity: 'HIGH',
          section: 'Hero',
          issue: `Hero section too small (${heroHeight}px, should be 900px)`,
          fix: 'Check if hero section is rendering correctly with proper height'
        });
      }
    }
    
    // Check product cards
    const productCards = document.querySelectorAll('[class*="product"]');
    if (productCards.length === 0) {
      problems.push({
        severity: 'HIGH',
        section: 'Products',
        issue: 'No product cards found',
        fix: 'Ensure products are loading from API'
      });
    }
    
    // Check spacing between sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      const styles = window.getComputedStyle(section);
      const marginTop = parseFloat(styles.marginTop);
      const marginBottom = parseFloat(styles.marginBottom);
      const paddingTop = parseFloat(styles.paddingTop);
      const paddingBottom = parseFloat(styles.paddingBottom);
      
      const totalSpacing = marginTop + marginBottom + paddingTop + paddingBottom;
      if (totalSpacing < 40 && index > 0) {
        problems.push({
          severity: 'MEDIUM',
          section: `Section ${index}`,
          issue: 'Insufficient spacing between sections',
          fix: 'Add proper padding/margin between sections'
        });
      }
    });
    
    // Check CTA buttons
    const ctaButtons = document.querySelectorAll('button');
    ctaButtons.forEach((btn) => {
      const rect = btn.getBoundingClientRect();
      if (rect.height < 40) {
        problems.push({
          severity: 'MEDIUM',
          section: 'Buttons',
          issue: `Button too small (${rect.height}px height)`,
          fix: 'Increase button size for better touch targets'
        });
      }
    });
    
    // Check color contrast
    const darkTextOnLight = document.querySelectorAll('.text-gray-600, .text-gray-500');
    if (darkTextOnLight.length > 20) {
      problems.push({
        severity: 'LOW',
        section: 'Typography',
        issue: 'Too much gray text, may have contrast issues',
        fix: 'Use darker text colors for better readability'
      });
    }
    
    return problems;
  });
  
  issues.forEach((issue: any) => {
    console.log(`   [${issue.severity}] ${issue.section}: ${issue.issue}`);
  });
  
  return issues;
}

function generateDetailedUXReport(issues: any[]): string {
  const highPriority = issues.filter(i => i.severity === 'HIGH');
  const mediumPriority = issues.filter(i => i.severity === 'MEDIUM');
  const lowPriority = issues.filter(i => i.severity === 'LOW');
  
  return `# Detailed UX Review Report

## Date: ${new Date().toISOString()}

## Executive Summary
Comprehensive UX review of BK Crackers homepage identified ${issues.length} issues:
- **High Priority**: ${highPriority.length} issues
- **Medium Priority**: ${mediumPriority.length} issues  
- **Low Priority**: ${lowPriority.length} issues

## Critical Issues (Must Fix)

${highPriority.map(issue => `### ${issue.section}
- **Issue**: ${issue.issue}
- **Fix**: ${issue.fix}
- **Priority**: 🔴 HIGH
`).join('\n')}

## Important Issues (Should Fix)

${mediumPriority.map(issue => `### ${issue.section}
- **Issue**: ${issue.issue}
- **Fix**: ${issue.fix}
- **Priority**: 🟡 MEDIUM
`).join('\n')}

## Minor Issues (Nice to Fix)

${lowPriority.map(issue => `### ${issue.section}
- **Issue**: ${issue.issue}
- **Fix**: ${issue.fix}
- **Priority**: 🟢 LOW
`).join('\n')}

## Recommendations

### Immediate Actions
1. Fix hero section height issue - it's not displaying at 900px
2. Ensure all product images are loading correctly
3. Add proper spacing between sections
4. Increase button sizes for better accessibility

### Design Improvements
1. Use stronger color contrast for text
2. Add more visual hierarchy with typography
3. Implement consistent spacing system
4. Add hover states to all interactive elements

### Performance Optimizations
1. Implement lazy loading for images
2. Optimize image sizes and formats
3. Add loading skeletons for dynamic content
4. Consider virtual scrolling for product lists

### Accessibility Checklist
- [ ] All images have alt text
- [ ] Keyboard navigation works properly
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible
- [ ] Screen reader friendly markup

## Next Steps
1. Address all HIGH priority issues immediately
2. Schedule fixes for MEDIUM priority issues
3. Include LOW priority fixes in next design iteration
4. Re-test after implementing fixes
`;
}