import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Filter } from "lucide-react";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/event/events"
        );
        setEvents(response.data.events); // Assuming the response contains an `events` array
        setFilteredEvents(response.data.events);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching events."
        );
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Search and filter events
  useEffect(() => {
    const filtered = events.filter((event) => {
      const matchesSearch =
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.clubName.toLowerCase().includes(searchTerm.toLowerCase());
      const isUpcoming = new Date(event.date) >= new Date();
      const matchesFilter =
        filter === "all" ||
        (filter === "upcoming" && isUpcoming) ||
        (filter === "past" && !isUpcoming);
      return matchesSearch && matchesFilter;
    });

    setFilteredEvents(filtered);
  }, [searchTerm, filter, events]);

  if (loading) {
    return <div className="loading-message">Loading Events...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="events-container">
      <div className="events-content">
        <h1>Campus Events</h1>
        <p className="events-subtitle">Stay Connected, Stay Involved</p>

        <div className="search-filter-container">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search events or clubs..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              <Filter size={20} />
              All
            </button>
            <button
              className={`filter-btn ${filter === "upcoming" ? "active" : ""}`}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`filter-btn ${filter === "past" ? "active" : ""}`}
              onClick={() => setFilter("past")}
            >
              Past Events
            </button>
          </div>
        </div>

        <div className="events-grid">
          {filteredEvents.map((event) => (
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
                <p>
                  <strong>Club Name:</strong> {event.clubName}
                </p>
                <p>
                  <strong>Event Type:</strong> {event.eventType}
                </p>
                <p>
                  <strong>Semester:</strong> {event.semester}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Venue:</strong> {event.eventVenue}
                </p>
                <p>
                  <strong>Speaker:</strong>{" "}
                  {event.speaker?.name && event.speaker?.company
                    ? `${event.speaker.name} (${event.speaker.company})`
                    : "N/A"}
                </p>
                <p>
                  <strong>Sponsor:</strong> {event.eventSponsor || "N/A"}
                </p>
                <p>
                  <strong>Description:</strong> {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
