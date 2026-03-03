import React from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { QuickReplies } from "./QuickReplies";
import { LeadForm } from "./LeadForm";
import type { Message } from "../hooks/useChat";

interface ChatWindowProps {
  companyName: string;
  primaryColor: string;
  messages: Message[];
  loading: boolean;
  quickReplies: string[];
  showLeadForm: boolean;
  apiUrl: string;
  siteId: string;
  onSend: (text: string) => void;
  onClose: () => void;
  onDismissLeadForm: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  companyName,
  primaryColor,
  messages,
  loading,
  quickReplies,
  showLeadForm,
  apiUrl,
  siteId,
  onSend,
  onClose,
  onDismissLeadForm,
}) => {
  return (
    <div className="chat-window" style={{ "--primary-color": primaryColor } as React.CSSProperties}>
      <div className="chat-header" style={{ backgroundColor: primaryColor }}>
        <span className="chat-header-title">{companyName}</span>
        <button
          className="chat-header-close"
          onClick={onClose}
          aria-label="Close chat"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="chat-body">
        <MessageList messages={messages} />

        {loading && (
          <div className="typing-indicator">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        )}

        {showLeadForm && (
          <LeadForm
            apiUrl={apiUrl}
            siteId={siteId}
            onDismiss={onDismissLeadForm}
          />
        )}
      </div>

      {messages.length === 0 && !showLeadForm && (
        <QuickReplies replies={quickReplies} onSelect={onSend} />
      )}

      <MessageInput onSend={onSend} disabled={loading} />
    </div>
  );
};
