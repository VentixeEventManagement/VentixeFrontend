import React, { useState } from "react";
import "./eventAdminButtons.css";
import CreateEventForm from "./createEventForm/createEventForm";
import { useDispatch } from "react-redux";
import { createEvent } from "../../features/eventsSlice";

const EventAdminButtons = ({ onUpdate, onDelete }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCreate = (data) => {
    dispatch(createEvent(data));
  };

  return (
    <div className="event-admin-buttons" >
      <button type="button" onClick={() => setOpen(true)}>Create Event</button>
      <CreateEventForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default EventAdminButtons;