import React from "react";
import "./eventAdminButtons.css";

const EventAdminButtons = ({ onCreate, onUpdate, onDelete }) => (
  <div>
    <button type="button" onClick={onCreate}>Create Event</button>
    <button type="button" onClick={onUpdate}>Update Event</button>
    <button type="button" onClick={onDelete}>Delete Event</button>
  </div>
);

export default EventAdminButtons;