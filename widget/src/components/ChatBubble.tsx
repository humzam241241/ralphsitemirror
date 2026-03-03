import React from "react";

interface ChatBubbleProps {
  primaryColor: string;
  onClick: () => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  primaryColor,
  onClick,
}) => {
  return (
    <button
      className="chat-bubble"
      onClick={onClick}
      style={{ backgroundColor: primaryColor }}
      aria-label="Open chat"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
};
