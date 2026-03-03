import React, { useState } from "react";
import { submitLead } from "../utils/api";

interface LeadFormProps {
  apiUrl: string;
  siteId: string;
  onDismiss: () => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export const LeadForm: React.FC<LeadFormProps> = ({
  apiUrl,
  siteId,
  onDismiss,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("submitting");
    setErrorText("");

    try {
      await submitLead(apiUrl, {
        site_id: siteId,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        message: message.trim(),
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorText(
        err instanceof Error ? err.message : "Failed to submit. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="lead-form">
        <div className="lead-form-success">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary-color)"
            strokeWidth="2"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <p>Thanks! We'll be in touch soon.</p>
          <button className="lead-form-dismiss" onClick={onDismiss}>
            Continue chatting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lead-form">
      <div className="lead-form-header">
        <span>Leave your details</span>
        <button
          className="lead-form-close"
          onClick={onDismiss}
          aria-label="Close form"
        >
          ✕
        </button>
      </div>
      <form onSubmit={handleSubmit} className="lead-form-body">
        <input
          type="text"
          placeholder="Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="lead-input"
        />
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="lead-input"
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="lead-input"
        />
        <textarea
          placeholder="Message *"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="lead-textarea"
          rows={3}
        />
        {status === "error" && <p className="lead-error">{errorText}</p>}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="lead-submit"
        >
          {status === "submitting" ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};
