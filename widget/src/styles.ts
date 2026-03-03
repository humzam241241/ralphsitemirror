export const widgetStyles = `
  :host {
    --primary-color: #f8b427;
    --bg-color: #ffffff;
    --text-color: #1a1a1a;
    --text-secondary: #6b7280;
    --border-color: #e5e7eb;
    --bot-bg: #f3f4f6;
    --user-bg: var(--primary-color);
    --user-text: #ffffff;
    --radius: 12px;
    --shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;

    all: initial;
    font-family: var(--font);
    font-size: 14px;
    line-height: 1.5;
    color: var(--text-color);
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── Chat Bubble ── */
  .chat-bubble {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    z-index: 2147483647;
  }
  .chat-bubble:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
  }
  .chat-bubble:active {
    transform: scale(0.95);
  }

  /* ── Chat Window ── */
  .chat-window {
    position: fixed;
    bottom: 96px;
    right: 24px;
    width: 380px;
    height: 520px;
    background: var(--bg-color);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 2147483647;
    animation: slideUp 0.25s ease-out;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── Header ── */
  .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    color: #fff;
    flex-shrink: 0;
  }
  .chat-header-title {
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 0.01em;
  }
  .chat-header-close {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    transition: background 0.15s;
  }
  .chat-header-close:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  /* ── Body / Message List ── */
  .chat-body {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .message-list {
    flex: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
  }

  .message-row {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    max-width: 85%;
  }
  .message-row.bot {
    align-self: flex-start;
  }
  .message-row.user {
    align-self: flex-end;
    flex-direction: row-reverse;
  }

  .bot-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--bot-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--text-secondary);
  }

  .message-bubble {
    padding: 10px 14px;
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    gap: 4px;
    word-break: break-word;
  }
  .message-row.bot .message-bubble {
    background: var(--bot-bg);
    border-bottom-left-radius: 4px;
    color: var(--text-color);
  }
  .message-row.user .message-bubble {
    background: var(--primary-color);
    border-bottom-right-radius: 4px;
    color: var(--user-text);
  }

  .message-text {
    font-size: 14px;
    line-height: 1.45;
  }
  .message-time {
    font-size: 11px;
    opacity: 0.6;
    align-self: flex-end;
  }

  /* ── Typing Indicator ── */
  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 16px 12px;
  }
  .typing-indicator .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--text-secondary);
    animation: bounce 1.4s infinite ease-in-out both;
  }
  .typing-indicator .dot:nth-child(1) { animation-delay: 0s; }
  .typing-indicator .dot:nth-child(2) { animation-delay: 0.16s; }
  .typing-indicator .dot:nth-child(3) { animation-delay: 0.32s; }

  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
  }

  /* ── Quick Replies ── */
  .quick-replies {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px 16px;
    border-top: 1px solid var(--border-color);
  }
  .quick-reply-chip {
    padding: 6px 14px;
    border: 1px solid var(--primary-color);
    border-radius: 20px;
    background: transparent;
    color: var(--primary-color);
    font-size: 13px;
    font-family: var(--font);
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
  }
  .quick-reply-chip:hover {
    background: var(--primary-color);
    color: #fff;
  }

  /* ── Message Input ── */
  .message-input {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid var(--border-color);
    flex-shrink: 0;
  }
  .message-input-field {
    flex: 1;
    border: 1px solid var(--border-color);
    border-radius: 24px;
    padding: 10px 16px;
    font-size: 14px;
    font-family: var(--font);
    outline: none;
    transition: border-color 0.15s;
    color: var(--text-color);
    background: var(--bg-color);
  }
  .message-input-field::placeholder {
    color: var(--text-secondary);
  }
  .message-input-field:focus {
    border-color: var(--primary-color);
  }
  .message-input-field:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .send-button {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: none;
    background: var(--primary-color);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: opacity 0.15s, transform 0.15s;
  }
  .send-button:hover:not(:disabled) {
    transform: scale(1.06);
  }
  .send-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* ── Lead Form ── */
  .lead-form {
    padding: 12px 16px;
    border-top: 1px solid var(--border-color);
    animation: slideUp 0.2s ease-out;
  }
  .lead-form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 14px;
  }
  .lead-form-close {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-secondary);
    font-size: 16px;
    padding: 2px 6px;
    border-radius: 4px;
  }
  .lead-form-close:hover {
    background: var(--bot-bg);
  }

  .lead-form-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lead-input,
  .lead-textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 13px;
    font-family: var(--font);
    outline: none;
    color: var(--text-color);
    background: var(--bg-color);
    transition: border-color 0.15s;
  }
  .lead-input:focus,
  .lead-textarea:focus {
    border-color: var(--primary-color);
  }
  .lead-textarea {
    resize: vertical;
    min-height: 60px;
  }

  .lead-error {
    color: #ef4444;
    font-size: 12px;
  }

  .lead-submit {
    padding: 9px 16px;
    border: none;
    border-radius: 8px;
    background: var(--primary-color);
    color: #fff;
    font-size: 14px;
    font-family: var(--font);
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.15s;
  }
  .lead-submit:hover:not(:disabled) {
    opacity: 0.9;
  }
  .lead-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .lead-form-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 12px 0;
    text-align: center;
  }
  .lead-form-success p {
    font-size: 14px;
    color: var(--text-color);
  }
  .lead-form-dismiss {
    background: none;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    font-size: 13px;
    font-family: var(--font);
    text-decoration: underline;
  }

  /* ── Responsive: mobile full-screen ── */
  @media (max-width: 480px) {
    .chat-window {
      bottom: 0;
      right: 0;
      width: 100vw;
      height: 100vh;
      border-radius: 0;
    }
    .chat-bubble {
      bottom: 16px;
      right: 16px;
    }
  }
`;
