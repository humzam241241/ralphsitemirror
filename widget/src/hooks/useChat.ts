import { useState, useCallback } from "react";
import { sendChatMessage, type ChatResponse } from "../utils/api";

export interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: number;
}

interface UseChatReturn {
  messages: Message[];
  loading: boolean;
  sendMessage: (text: string) => Promise<void>;
  shouldShowLeadForm: boolean;
  shouldShowBookingModal: boolean;
  shouldShowEmergencyCTA: boolean;
  dismissLeadForm: () => void;
  dismissBookingModal: () => void;
  addBotMessage: (text: string) => void;
}

let messageCounter = 0;
function nextId(): string {
  return `msg-${Date.now()}-${++messageCounter}`;
}

export function useChat(apiUrl: string, siteId: string): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [shouldShowLeadForm, setShouldShowLeadForm] = useState(false);
  const [shouldShowBookingModal, setShouldShowBookingModal] = useState(false);
  const [shouldShowEmergencyCTA, setShouldShowEmergencyCTA] = useState(false);

  const addBotMessage = useCallback((text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: nextId(), sender: "bot", text, timestamp: Date.now() },
    ]);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = {
        id: nextId(),
        sender: "user",
        text: trimmed,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      try {
        const data: ChatResponse = await sendChatMessage(
          apiUrl,
          siteId,
          trimmed,
          window.location.href
        );

        const botMsg: Message = {
          id: nextId(),
          sender: "bot",
          text: data.reply,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, botMsg]);

        if (data.intent === 'booking') {
          setShouldShowBookingModal(true);
        } else if (data.intent === 'emergency') {
          setShouldShowEmergencyCTA(true);
          setTimeout(() => setShouldShowEmergencyCTA(false), 15000);
        } else if (data.intent === 'quote') {
          setShouldShowLeadForm(true);
        } else if (data.should_capture_lead) {
          setShouldShowLeadForm(true);
        }
      } catch {
        const errorMsg: Message = {
          id: nextId(),
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, siteId, loading]
  );

  const dismissLeadForm = useCallback(() => {
    setShouldShowLeadForm(false);
  }, []);

  const dismissBookingModal = useCallback(() => {
    setShouldShowBookingModal(false);
  }, []);

  return {
    messages,
    loading,
    sendMessage,
    shouldShowLeadForm,
    shouldShowBookingModal,
    shouldShowEmergencyCTA,
    dismissLeadForm,
    dismissBookingModal,
    addBotMessage,
  };
}
