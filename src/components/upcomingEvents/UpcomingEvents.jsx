import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../../features/eventsSlice";

const UpcomingEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  console.log("Events from Redux store:", events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

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