import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import './Events.css';

const parseDate = (dateStr) => {
  const month = dateStr.substring(0, 2);
  const day = dateStr.substring(2, 4);
  const year = `20${dateStr.substring(4, 6)}`;
  return new Date(`${year}-${month}-${day}`);
};

const EventCard = ({ event }) => (
  <div className="event-card">
    <img 
      src={event.eventpic || "/api/placeholder/400/300"} 
      alt={event.title}
      className="event-image"
    />
    <div className="event-content">
      <div className="club-name">{event.clubname}</div>
      <h3>{event.title}</h3>
      <p className="event-description">{event.desc}</p>
      <div className="event-footer">
        <div className="event-date">
          <span>{event.datename}</span>
        </div>
        <span className={`event-status ${parseDate(event.date) >= new Date() ? 'upcoming' : 'past'}`}>
          {parseDate(event.date) >= new Date() ? 'Upcoming' : 'Past Event'}
        </span>
      </div>
    </div>
  </div>
);

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const eventsData = {
    "Events": [
      {
        "id": 1,
        "title": "Tech Workshop 2025",
        "club_id": "tech123",
        "clubname": "Programming Club",
        "desc": "Join us for an exciting workshop on emerging technologies",
        "date": "010125",
        "datename": "1st Jan",
        "eventpic": "https://cdn.prod.website-files.com/61f29c609f84a86e418fbcfb/63ecdf6e6df724eab1f0e8ca_20230215T0132-25bece5c-5ab8-4c33-98c7-60ad2668054b.webp"
      },
      {
        "id": 2,
        "title": "Cultural Night",
        "club_id": "cult123",
        "clubname": "Cultural Club",
        "desc": "Experience diverse cultures through music and dance",
        "date": "020125",
        "datename": "2nd Jan",
        "eventpic": "https://cdn.prod.website-files.com/61f29c609f84a86e418fbcfb/63ecdf6e6df724eab1f0e8ca_20230215T0132-25bece5c-5ab8-4c33-98c7-60ad2668054b.webp"
      }
    ]
  };

  const filteredEvents = eventsData.Events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.clubname.toLowerCase().includes(searchTerm.toLowerCase());
    const isUpcoming = parseDate(event.date) >= new Date();
    const matchesFilter = filter === 'all' || 
      (filter === 'upcoming' && isUpcoming) ||
      (filter === 'past' && !isUpcoming);
    return matchesSearch && matchesFilter;
  });

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
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              <Filter size={20} />
              All
            </button>
            <button
              className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`filter-btn ${filter === 'past' ? 'active' : ''}`}
              onClick={() => setFilter('past')}
            >
              Past Events
            </button>
          </div>
        </div>

        <div className="events-grid">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;