import { test, expect } from '@playwright/test';

test.describe('Raffy Chat Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const chatBubble = page.locator('.chat-bubble, button:has-text("Chat")').first();
    await chatBubble.click();
    await page.waitForTimeout(2000);
  });

  test('should handle service inquiry', async ({ page }) => {
    const messageInput = page.locator('input[type="text"], textarea').first();
    await messageInput.fill('What roofing services do you offer?');
    
    const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
    await sendButton.click();
    
    await page.waitForTimeout(3000);
    
    const botMessage = page.locator('.message.bot, .bot-message').last();
    await expect(botMessage).toContainText(/inspection|repair|replacement|roofing/i, { timeout: 10000 });
  });

  test('should handle pricing questions', async ({ page }) => {
    const messageInput = page.locator('input[type="text"], textarea').first();
    await messageInput.fill('How much does a roof inspection cost?');
    
    const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
    await sendButton.click();
    
    await page.waitForTimeout(3000);
    
    const leadForm = page.locator('.lead-form, form').last();
    await expect(leadForm).toBeVisible({ timeout: 10000 });
  });

  test('should handle booking requests', async ({ page }) => {
    const messageInput = page.locator('input[type="text"], textarea').first();
    await messageInput.fill('I would like to schedule an inspection');
    
    const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
    await sendButton.click();
    
    await page.waitForTimeout(3000);
    
    const bookingModal = page.locator('.booking-modal, .lead-form').last();
    await expect(bookingModal).toBeVisible({ timeout: 10000 });
  });

  test('should handle emergency situations', async ({ page }) => {
    const messageInput = page.locator('input[type="text"], textarea').first();
    await messageInput.fill('Emergency! My roof is leaking badly');
    
    const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
    await sendButton.click();
    
    await page.waitForTimeout(3000);
    
    const emergencyCTA = page.locator('.emergency-cta, a[href^="tel:"]').last();
    await expect(emergencyCTA).toBeVisible({ timeout: 10000 });
  });

  test('should handle area/coverage questions', async ({ page }) => {
    const messageInput = page.locator('input[type="text"], textarea').first();
    await messageInput.fill('Do you service Oshawa?');
    
    const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
    await sendButton.click();
    
    await page.waitForTimeout(3000);
    
    const botMessage = page.locator('.message.bot, .bot-message').last();
    await expect(botMessage).toContainText(/oshawa|durham|region|area/i, { timeout: 10000 });
  });

  test('should handle material/technical questions', async ({ page }) => {
    const messageInput = page.locator('input[type="text"], textarea').first();
    await messageInput.fill('What type of shingles do you use?');
    
    const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
    await sendButton.click();
    
    await page.waitForTimeout(3000);
    
    const botMessage = page.locator('.message.bot, .bot-message').last();
    await expect(botMessage).toBeVisible({ timeout: 10000 });
  });

  test('should handle timeline questions', async ({ page }) => {
    const messageInput = page.locator('input[type="text"], textarea').first();
    await messageInput.fill('How long does a roof replacement take?');
    
    const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
    await sendButton.click();
    
    await page.waitForTimeout(3000);
    
    const botMessage = page.locator('.message.bot, .bot-message').last();
    await expect(botMessage).toBeVisible({ timeout: 10000 });
  });

  test('should handle multiple message exchanges', async ({ page }) => {
    const messageInput = page.locator('input[type="text"], textarea').first();
    const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
    
    await messageInput.fill('What areas do you cover?');
    await sendButton.click();
    await page.waitForTimeout(3000);
    
    await messageInput.fill('Can you give me a quote?');
    await sendButton.click();
    await page.waitForTimeout(3000);
    
    const messages = await page.locator('.message, .chat-message').count();
    expect(messages).toBeGreaterThan(3);
  });

  test('should use quick reply chips', async ({ page }) => {
    const quickReply = page.locator('.quick-reply, .quick-replies button').first();
    
    if (await quickReply.isVisible({ timeout: 3000 })) {
      await quickReply.click();
      await page.waitForTimeout(2000);
      
      const userMessage = page.locator('.message.user, .user-message').last();
      await expect(userMessage).toBeVisible();
    }
  });

  test('should maintain conversation history', async ({ page }) => {
    const messageInput = page.locator('input[type="text"], textarea').first();
    const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
    
    await messageInput.fill('First message');
    await sendButton.click();
    await page.waitForTimeout(2000);
    
    await messageInput.fill('Second message');
    await sendButton.click();
    await page.waitForTimeout(2000);
    
    const firstMessage = page.locator('text=First message').first();
    await expect(firstMessage).toBeVisible();
  });
});
