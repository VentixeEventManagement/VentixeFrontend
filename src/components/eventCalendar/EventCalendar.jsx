import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "./EventCalendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

function EventCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://eventprovider20250513014429-abhdcxdthwhpc3dp.swedencentral-01.azurewebsites.net/api/Event")
      .then((res) => res.json())
      .then((data) => {
        const mappedEvents = data.map((event) => ({
          title: event.name,
          start: new Date(event.startDate),
          end: new Date(event.endDate),
          allDay: false,
        }));
        setEvents(mappedEvents);
      });
  }, []);

  return (
    <div className="event-calendar-container">
      <div className="event-calendar-card">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </div>
  );
}

export default EventCalendar;