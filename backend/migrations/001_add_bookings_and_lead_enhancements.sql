-- Migration: Add booking and lead enhancements
-- Run this migration on your Supabase database

-- Add new columns to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'chat';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS intent VARCHAR(50);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS booking_reference VARCHAR(255);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
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

-- Create indexes for bookings
CREATE INDEX IF NOT EXISTS idx_bookings_site_id ON bookings(site_id);
CREATE INDEX IF NOT EXISTS idx_bookings_lead_id ON bookings(lead_id);
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled_time ON bookings(scheduled_time);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Create indexes for new leads columns
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_intent ON leads(intent);

-- Add comments for documentation
COMMENT ON COLUMN leads.source IS 'Source of the lead: chat, contact_form, booking, etc.';
COMMENT ON COLUMN leads.intent IS 'Detected intent: booking, quote, emergency, general, etc.';
COMMENT ON COLUMN leads.booking_reference IS 'Reference to booking if lead came from booking flow';

COMMENT ON TABLE bookings IS 'Stores all booking appointments created through Cal.com integration';
COMMENT ON COLUMN bookings.cal_com_booking_id IS 'Cal.com booking UID for API integration';
COMMENT ON COLUMN bookings.status IS 'Booking status: confirmed, cancelled, completed, no_show';

-- Insert sample data (optional - for testing)
-- INSERT INTO bookings (site_id, attendee_name, attendee_email, attendee_phone, scheduled_time, service_type, notes)
-- VALUES (
--   (SELECT id FROM sites LIMIT 1),
--   'John Doe',
--   'john@example.com',
--   '905-555-1234',
--   NOW() + INTERVAL '1 day',
--   'Roof Inspection',
--   'Testing booking flow'
-- );
