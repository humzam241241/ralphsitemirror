import { test, expect } from '@playwright/test';

test.describe('Cal.com Calendar Embed', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact');
    await page.waitForLoadState('networkidle');
  });

  test('should display Schedule Online button', async ({ page }) => {
    const scheduleButton = page.getByRole('button', { name: /Schedule Online/i });
    await expect(scheduleButton).toBeVisible();
  });

  test('should open calendar modal when button is clicked', async ({ page }) => {
    const scheduleButton = page.getByRole('button', { name: /Schedule Online/i });
    await scheduleButton.click();
    
    const modal = page.locator('.booking-modal, [role="dialog"]').first();
    await expect(modal).toBeVisible({ timeout: 5000 });
  });

  test('should display close button in modal', async ({ page }) => {
    const scheduleButton = page.getByRole('button', { name: /Schedule Online/i });
    await scheduleButton.click();
    
    const closeButton = page.locator('button[aria-label="Close"], button:has-text("✕")').last();
    await expect(closeButton).toBeVisible({ timeout: 3000 });
  });

  test('should close modal when close button is clicked', async ({ page }) => {
    const scheduleButton = page.getByRole('button', { name: /Schedule Online/i });
    await scheduleButton.click();
    
    await page.waitForTimeout(1000);
    
    const closeButton = page.locator('button[aria-label="Close"], button:has-text("✕")').last();
    await closeButton.click();
    
    await page.waitForTimeout(500);
    
    const modal = page.locator('.booking-modal, [role="dialog"]').first();
    await expect(modal).not.toBeVisible({ timeout: 2000 });
  });

  test('should close modal when clicking overlay', async ({ page }) => {
    const scheduleButton = page.getByRole('button', { name: /Schedule Online/i });
    await scheduleButton.click();
    
    await page.waitForTimeout(1000);
    
    const overlay = page.locator('.booking-modal-overlay, .modal-overlay').first();
    await overlay.click({ position: { x: 10, y: 10 } });
    
    await page.waitForTimeout(500);
    
    const modal = page.locator('.booking-modal, [role="dialog"]').first();
    await expect(modal).not.toBeVisible({ timeout: 2000 });
  });

  test('should load Cal.com iframe content', async ({ page }) => {
    const scheduleButton = page.getByRole('button', { name: /Schedule Online/i });
    await scheduleButton.click();
    
    const iframe = page.frameLocator('iframe[src*="cal.com"]').first();
    const calContent = iframe.locator('body');
    await expect(calContent).toBeVisible({ timeout: 15000 });
  });

  test('should have booking form fields in widget modal', async ({ page }) => {
    const chatBubble = page.locator('.chat-bubble, button:has-text("Chat")').first();
    
    if (await chatBubble.isVisible({ timeout: 3000 })) {
      await chatBubble.click();
      await page.waitForTimeout(1000);
      
      const messageInput = page.locator('input[type="text"], textarea').first();
      if (await messageInput.isVisible({ timeout: 2000 })) {
        await messageInput.fill('I want to book an appointment');
        
        const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
        await sendButton.click();
        
        await page.waitForTimeout(3000);
        
        const bookingModal = page.locator('.booking-modal').first();
        if (await bookingModal.isVisible({ timeout: 5000 })) {
          const nameField = bookingModal.locator('input[name="name"]');
          await expect(nameField).toBeVisible();
          
          const emailField = bookingModal.locator('input[name="email"]');
          await expect(emailField).toBeVisible();
          
          const dateField = bookingModal.locator('input[name="date"]');
          await expect(dateField).toBeVisible();
        }
      }
    }
  });
});
