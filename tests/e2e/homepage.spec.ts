import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Ryan's Roofing/i);
  });

  test('should display hero section', async ({ page }) => {
    const hero = page.locator('section').first();
    await expect(hero).toContainText(/Precision Roofing/i);
    await expect(hero).toContainText(/Smart Technology/i);
  });

  test('should have working navigation links', async ({ page }) => {
    const servicesLink = page.locator('a[href*="#services"]');
    await expect(servicesLink).toBeVisible();
    
    await servicesLink.click();
    await page.waitForTimeout(500);
    
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeInViewport();
  });

  test('should display contact information', async ({ page }) => {
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toContainText(/905/);

    const emailLink = page.locator('a[href^="mailto:"]').first();
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toContainText(/@ryansroofing/);
  });

  test('should have mobile menu toggle', async ({ page, isMobile }) => {
    if (isMobile) {
      const menuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu")');
      await expect(menuButton).toBeVisible();
      
      await menuButton.click();
      await page.waitForTimeout(300);
      
      const mobileNav = page.locator('nav').last();
      await expect(mobileNav).toBeVisible();
    }
  });

  test('should validate contact form fields', async ({ page }) => {
    await page.goto('/#contact');
    
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveAttribute('required');
    
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toHaveAttribute('required');
  });

  test('should display services section', async ({ page }) => {
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeVisible();
    
    await expect(servicesSection).toContainText(/Roof Inspection/i);
    await expect(servicesSection).toContainText(/Repair/i);
    await expect(servicesSection).toContainText(/Replacement/i);
  });

  test('should have Schedule Online button', async ({ page }) => {
    const scheduleButton = page.getByRole('button', { name: /Schedule Online/i });
    await expect(scheduleButton).toBeVisible();
  });
});
