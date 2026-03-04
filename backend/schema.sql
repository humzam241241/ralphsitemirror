CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  domain TEXT NOT NULL,
  primary_color TEXT DEFAULT '#f8b427',
  tone TEXT DEFAULT 'friendly and professional',
  custom_prompt TEXT,
  welcome_message TEXT DEFAULT 'Hi! How can I help you today?',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  url TEXT,
  content TEXT NOT NULL,
  embedding vector(1536),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX idx_documents_site_id ON documents(site_id);

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  phone TEXT,
  message TEXT,
  page_url TEXT,
  source VARCHAR(50) DEFAULT 'chat',
  intent VARCHAR(50),
  booking_reference VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_leads_site_id ON leads(site_id);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_intent ON leads(intent);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  cal_com_booking_id VARCHAR(255),
  attendee_name VARCHAR(255) NOT NULL,
  attendee_email VARCHAR(255) NOT NULL,
  attendee_phone VARCHAR(50),
  scheduled_time TIMESTAMPTZ NOT NULL,
  service_type VARCHAR(100) DEFAULT 'Roof Inspection',
  notes TEXT,
  status VARCHAR(50) DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_bookings_site_id ON bookings(site_id);
CREATE INDEX idx_bookings_lead_id ON bookings(lead_id);
CREATE INDEX idx_bookings_scheduled_time ON bookings(scheduled_time);
CREATE INDEX idx_bookings_status ON bookings(status);

