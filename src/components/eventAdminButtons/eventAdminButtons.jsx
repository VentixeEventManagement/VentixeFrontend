import React, { useState } from "react";
import "./eventAdminButtons.css";
import CreateEventForm from "./createEventForm/createEventForm";
import { useDispatch } from "react-redux";
import { createEvent } from "../../features/eventsSlice";

const EventAdminButtons = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCreate = (data) => {
    dispatch(createEvent(data));
    setOpen(false);
  };

  return (
    <div className="event-admin-buttons">
      <button onClick={() => setOpen(true)}>
        Create Event
      </button>
      <CreateEventForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default EventAdminButtons;