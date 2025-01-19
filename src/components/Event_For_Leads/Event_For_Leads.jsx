import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Event_For_Leads.css";

function Event_For_Leads() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const clubName = localStorage.getItem("name") || "Unknown Club";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/event/events");
        const filteredEvents = response.data.events.filter(
          (event) => event.clubName === clubName
        );
        setEvents(filteredEvents);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch events.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, [clubName]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/event/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      setError("Failed to delete the event.");
    }
  };

  const handleUpdate = (id) => {
    // Redirect to the update form or trigger an update modal
    window.location.href = `/update-event/${id}`;
  };

  return (
    <div className="event-leads-container">
      <h1>Your Events</h1>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : events.length === 0 ? (
        <div>No events found for your club.</div>
      ) : (
        <div className="event-list">
          {events.map((event) => (
            <div className="event-card" key={event._id}>
              <h3>{event.eventName}</h3>
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
              <p><strong>Sponsor:</strong> {event.eventSponsor}</p>
              {event.image && (
                <div className="event-image">
                  <strong>Image:</strong>
                  <img
                    src={`${event.image}`}
                    alt={event.eventName}
                    className="event-image-preview"
                  />
                </div>
              )}
              <div className="event-actions">
                <button className="update-button" onClick={() => handleUpdate(event._id)}>
                  Update
                </button>
                <button className="delete-button" onClick={() => handleDelete(event._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Event_For_Leads;
