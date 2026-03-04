import axios from 'axios';

const CAL_COM_API_KEY = process.env.CAL_COM_API_KEY;
const CAL_COM_API_URL = 'https://api.cal.com/v1';

export async function createBooking(bookingData) {
  const { siteId, attendeeName, attendeeEmail, attendeePhone, scheduledTime, serviceType, notes } = bookingData;

  try {
    const response = await axios.post(
      `${CAL_COM_API_URL}/bookings`,
      {
        eventTypeId: process.env.CAL_COM_EVENT_TYPE_ID,
        start: scheduledTime,
        responses: {
          name: attendeeName,
          email: attendeeEmail,
          phone: attendeePhone,
          notes: notes || '',
        },
        timeZone: 'America/Toronto',
        language: 'en',
        metadata: {
          siteId,
          serviceType: serviceType || 'Roof Inspection',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${CAL_COM_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      bookingId: response.data.id,
      bookingUid: response.data.uid,
      data: response.data,
    };
  } catch (error) {
    console.error('Cal.com API error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create booking with Cal.com');
  }
}

export async function cancelBooking(bookingUid) {
  try {
    await axios.delete(
      `${CAL_COM_API_URL}/bookings/${bookingUid}`,
      {
        headers: {
          Authorization: `Bearer ${CAL_COM_API_KEY}`,
        },
      }
    );

    return {
      success: true,
      message: 'Booking cancelled successfully',
    };
  } catch (error) {
    console.error('Cal.com cancel error:', error.response?.data || error.message);
    throw new Error('Failed to cancel booking');
  }
}

export async function getBooking(bookingUid) {
  try {
    const response = await axios.get(
      `${CAL_COM_API_URL}/bookings/${bookingUid}`,
      {
        headers: {
          Authorization: `Bearer ${CAL_COM_API_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Cal.com get booking error:', error.response?.data || error.message);
    throw new Error('Failed to fetch booking');
  }
}
