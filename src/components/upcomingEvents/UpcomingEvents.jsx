import React from "react";
import { useSelector } from "react-redux";

const UpcomingEvents = () => {
  const events = useSelector((state) => state.events.items);

  const upcoming = [...events]
    .filter(e => new Date(e.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 3);

  if (upcoming.length === 0) {
    return <div className="upcoming-events"><p>No upcoming events.</p></div>;
  }

  return (
    <div className="upcoming-events">
      <h2>Upcoming Events</h2>
      <ul>
        {upcoming.map(event => (
          <li key={event.id} className="upcoming-event-item">
            <strong>{event.title || event.name}</strong><br />
            {new Date(event.startDate).toLocaleString()}<br />
            {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;