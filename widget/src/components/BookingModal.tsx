import React, { useState } from "react";

interface BookingModalProps {
  apiUrl: string;
  siteId: string;
  calLink?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  apiUrl,
  siteId,
  calLink = "ryansroofing/inspection",
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Roof Inspection",
    date: "",
    time: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const scheduledTime = new Date(`${formData.date}T${formData.time}`).toISOString();

    try {
      const response = await fetch(`${apiUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site_id: siteId,
          attendee_name: formData.name,
          attendee_email: formData.email,
          attendee_phone: formData.phone,
          scheduled_time: scheduledTime,
          service_type: formData.service,
          notes: formData.notes,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create booking");
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Booking error:", err);
      setError(err instanceof Error ? err.message : "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="booking-modal-header">
          <h3>Schedule an Appointment</h3>
          <button
            className="booking-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form className="booking-modal-form" onSubmit={handleSubmit}>
          {error && (
            <div className="booking-error">
              <p>{error}</p>
            </div>
          )}

          <div className="booking-field">
            <label htmlFor="name">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="booking-field">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="booking-field">
            <label htmlFor="phone">
              Phone <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="booking-field">
            <label htmlFor="service">Service Type</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
            >
              <option value="Roof Inspection">Roof Inspection</option>
              <option value="Roof Repair">Roof Repair</option>
              <option value="Full Replacement">Full Replacement</option>
              <option value="Emergency Tarping">Emergency Tarping</option>
              <option value="Flat Roofing">Flat Roofing</option>
              <option value="Gutter Services">Gutter Services</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="booking-field-row">
            <div className="booking-field">
              <label htmlFor="date">
                Preferred Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                required
              />
            </div>

            <div className="booking-field">
              <label htmlFor="time">
                Preferred Time <span className="required">*</span>
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="booking-field">
            <label htmlFor="notes">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Any specific concerns or details..."
            />
          </div>

          <div className="booking-modal-actions">
            <button
              type="button"
              className="booking-btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="booking-btn-primary"
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
