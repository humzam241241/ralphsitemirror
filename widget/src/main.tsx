import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { widgetStyles } from "./styles";

(function initChatbotWidget() {
  const script =
    document.currentScript ??
    document.querySelector<HTMLScriptElement>("script[data-site-id]");

  if (!script) {
    console.error("[ChatbotWidget] Could not find script tag with data-site-id");
    return;
  }

  const siteId = script.getAttribute("data-site-id") ?? "";
  const apiUrl = (script.getAttribute("data-api-url") ?? "").replace(/\/$/, "");

  if (!siteId) {
    console.error("[ChatbotWidget] Missing data-site-id attribute");
    return;
  }

  const container = document.createElement("div");
  container.id = "chatbot-widget-root";
  document.body.appendChild(container);

  const shadowRoot = container.attachShadow({ mode: "open" });

  const styleEl = document.createElement("style");
  styleEl.textContent = widgetStyles;
  shadowRoot.appendChild(styleEl);

  const appMount = document.createElement("div");
  appMount.id = "chatbot-widget-app";
  shadowRoot.appendChild(appMount);

  ReactDOM.createRoot(appMount).render(
    <React.StrictMode>
      <App siteId={siteId} apiUrl={apiUrl} />
    </React.StrictMode>
  );
})();
