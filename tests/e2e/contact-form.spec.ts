import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact');
    await page.waitForLoadState('networkidle');
  });

  test('should display contact form', async ({ page }) => {
    const form = page.locator('form').filter({ hasText: /message/i }).first();
    await expect(form).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]').filter({ hasText: /Send/i });
    await submitButton.click();
    
    const nameInput = page.locator('input[name="name"]');
    const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBe(true);
  });

  test('should submit form with valid data', async ({ page }) => {
    await page.locator('input[name="name"]').fill('John Doe');
    await page.locator('input[name="email"]').fill('john@example.com');
    await page.locator('input[name="phone"]').fill('905-555-1234');
    await page.locator('textarea[name="message"]').fill('I need a roof inspection');
    
    const submitButton = page.locator('button[type="submit"]').filter({ hasText: /Send/i });
    await submitButton.click();
    
    const successMessage = page.locator('text=/thank you|success/i').first();
    await expect(successMessage).toBeVisible({ timeout: 10000 });
  });

  test('should display contact information', async ({ page }) => {
    const contactInfo = page.locator('text=/Contact Info/i').first();
    await expect(contactInfo).toBeVisible();
    
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();
    
    const emailLink = page.locator('a[href^="mailto:"]').first();
    await expect(emailLink).toBeVisible();
  });
});
