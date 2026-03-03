import React, { useState, useEffect } from "react";
import { ChatBubble } from "./components/ChatBubble";
import { ChatWindow } from "./components/ChatWindow";
import { useChat } from "./hooks/useChat";
import { fetchSiteConfig, type SiteConfig } from "./utils/api";

interface AppProps {
  siteId: string;
  apiUrl: string;
}

const DEFAULT_CONFIG: SiteConfig = {
  site_id: "",
  company_name: "Chat with us",
  primary_color: "#f8b427",
  greeting_message: "Hi there! How can we help you today?",
  quick_replies: ["Get a Quote", "Book Inspection", "Contact Team"],
};

export const App: React.FC<AppProps> = ({ siteId, apiUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const {
    messages,
    loading,
    sendMessage,
    shouldShowLeadForm,
    dismissLeadForm,
    addBotMessage,
  } = useChat(apiUrl, siteId);

  useEffect(() => {
    let cancelled = false;
    fetchSiteConfig(apiUrl, siteId)
      .then((data) => {
        if (!cancelled) setConfig(data);
      })
      .catch(() => {
        /* use defaults */
      });
    return () => {
      cancelled = true;
    };
  }, [apiUrl, siteId]);

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0 && config.greeting_message) {
      addBotMessage(config.greeting_message);
    }
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {isOpen ? (
        <ChatWindow
          companyName={config.company_name}
          primaryColor={config.primary_color}
          messages={messages}
          loading={loading}
          quickReplies={config.quick_replies}
          showLeadForm={shouldShowLeadForm}
          apiUrl={apiUrl}
          siteId={siteId}
          onSend={sendMessage}
          onClose={handleClose}
          onDismissLeadForm={dismissLeadForm}
        />
      ) : null}
      <ChatBubble primaryColor={config.primary_color} onClick={handleOpen} />
    </>
  );
};
