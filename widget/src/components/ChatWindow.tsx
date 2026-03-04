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
  showBookingModal: boolean;
  showEmergencyCTA: boolean;
  apiUrl: string;
  siteId: string;
  onSend: (text: string) => void;
  onClose: () => void;
  onDismissLeadForm: () => void;
  onDismissBookingModal: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  companyName,
  primaryColor,
  messages,
  loading,
  quickReplies,
  showLeadForm,
  showBookingModal,
  showEmergencyCTA,
  apiUrl,
  siteId,
  onSend,
  onClose,
  onDismissLeadForm,
  onDismissBookingModal,
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
        {showEmergencyCTA && (
          <div className="emergency-cta">
            <div className="emergency-cta-content">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              <div>
                <h4>Emergency Roofing Service</h4>
                <p>Need immediate assistance? Call us now!</p>
              </div>
            </div>
            <a href="tel:+19055551234" className="emergency-cta-button">
              Call (905) 555-1234
            </a>
          </div>
        )}

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

      {showBookingModal && (
        <BookingModal
          apiUrl={apiUrl}
          siteId={siteId}
          onClose={onDismissBookingModal}
          onSuccess={() => {
            onSend("Thank you! I've received your booking request.");
          }}
        />
      )}

      {messages.length === 0 && !showLeadForm && (
        <QuickReplies replies={quickReplies} onSelect={onSend} />
      )}

      <MessageInput onSend={onSend} disabled={loading} />
    </div>
  );
};
