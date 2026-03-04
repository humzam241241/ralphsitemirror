import { test, expect } from '@playwright/test';

test.describe('ChattyBot Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display chat bubble', async ({ page }) => {
    const chatBubble = page.locator('.chat-bubble, button:has-text("Chat")').first();
    await expect(chatBubble).toBeVisible({ timeout: 10000 });
  });

  test('should open chat window when bubble is clicked', async ({ page }) => {
    const chatBubble = page.locator('.chat-bubble, button:has-text("Chat")').first();
    await chatBubble.click();
    
    const chatWindow = page.locator('.chat-window').first();
    await expect(chatWindow).toBeVisible({ timeout: 5000 });
  });

  test('should send and receive messages', async ({ page }) => {
    const chatBubble = page.locator('.chat-bubble, button:has-text("Chat")').first();
    await chatBubble.click();
    
    await page.waitForTimeout(1000);
    
    const messageInput = page.locator('input[type="text"], textarea').first();
    await expect(messageInput).toBeVisible();
    
    await messageInput.fill('What services do you offer?');
    
    const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
    await sendButton.click();
    
    await page.waitForTimeout(2000);
    
    const botMessage = page.locator('.message.bot, .bot-message').last();
    await expect(botMessage).toBeVisible({ timeout: 10000 });
  });

  test('should show lead form on booking intent', async ({ page }) => {
    const chatBubble = page.locator('.chat-bubble, button:has-text("Chat")').first();
    await chatBubble.click();
    
    await page.waitForTimeout(1000);
    
    const messageInput = page.locator('input[type="text"], textarea').first();
    await messageInput.fill('I want to book an inspection');
    
    const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
    await sendButton.click();
    
    await page.waitForTimeout(3000);
    
    const leadFormOrModal = page.locator('.lead-form, .booking-modal, form').last();
    await expect(leadFormOrModal).toBeVisible({ timeout: 15000 });
  });
});
