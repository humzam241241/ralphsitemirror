export interface SiteConfig {
  site_id: string;
  company_name: string;
  primary_color: string;
  greeting_message: string;
  quick_replies: string[];
}

export interface ChatResponse {
  reply: string;
  should_capture_lead: boolean;
}

export interface LeadData {
  site_id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface LeadResponse {
  success: boolean;
  message: string;
}

const headers = { "Content-Type": "application/json" };

export async function fetchSiteConfig(
  apiUrl: string,
  siteId: string
): Promise<SiteConfig> {
  const res = await fetch(`${apiUrl}/site-config/${siteId}`);
  if (!res.ok) throw new Error(`Failed to fetch site config: ${res.status}`);
  return res.json();
}

export async function sendChatMessage(
  apiUrl: string,
  siteId: string,
  message: string,
  pageUrl: string
): Promise<ChatResponse> {
  const res = await fetch(`${apiUrl}/chat`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      site_id: siteId,
      user_message: message,
      current_page_url: pageUrl,
    }),
  });
  if (!res.ok) throw new Error(`Chat request failed: ${res.status}`);
  return res.json();
}

export async function submitLead(
  apiUrl: string,
  data: LeadData
): Promise<LeadResponse> {
  const res = await fetch(`${apiUrl}/leads`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Lead submission failed: ${res.status}`);
  return res.json();
}
