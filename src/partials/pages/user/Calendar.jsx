import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

function MyCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://eventprovider20250513014429-abhdcxdthwhpc3dp.swedencentral-01.azurewebsites.net/api/Event")
      .then((res) => res.json())
      .then((data) => {
        // Map backend events to calendar format
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
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  );
}

export default MyCalendar;