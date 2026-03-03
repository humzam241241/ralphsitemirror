import React from "react";

interface QuickRepliesProps {
  replies: string[];
  onSelect: (text: string) => void;
}

const DEFAULT_REPLIES = ["Get a Quote", "Book Inspection", "Contact Team"];

export const QuickReplies: React.FC<QuickRepliesProps> = ({
  replies,
  onSelect,
}) => {
  const items = replies.length > 0 ? replies : DEFAULT_REPLIES;

  return (
    <div className="quick-replies">
      {items.map((text) => (
        <button
          key={text}
          className="quick-reply-chip"
          onClick={() => onSelect(text)}
        >
          {text}
        </button>
      ))}
    </div>
  );
};
