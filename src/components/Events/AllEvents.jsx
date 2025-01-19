import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllEvents.css";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/event/events");
        setEvents(response.data.events); // Assuming the response contains an `events` array
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching events.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading Events...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="all-events-container">
      <h1>All Events</h1>
      {events.length === 0 ? (
        <div className="no-events-message">No events found.</div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card" key={event._id}>
              {event.image && (
                <img
                  src={event.image}
                  alt={event.eventName}
                  className="event-image"
                />
              )}
              <div className="event-details">
                <h2>{event.eventName}</h2>
                <p><strong>Club Name:</strong> {event.clubName}</p>
                <p><strong>Event Type:</strong> {event.eventType}</p>
                <p><strong>Semester:</strong> {event.semester}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Venue:</strong> {event.eventVenue}</p>
                <p>
                  <strong>Speaker:</strong>{" "}
                  {event.speaker?.name && event.speaker?.company
                    ? `${event.speaker.name} (${event.speaker.company})`
                    : "N/A"}
                </p>
                <p><strong>Sponsor:</strong> {event.eventSponsor || "N/A"}</p>
                <p><strong>Description:</strong> {event.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
