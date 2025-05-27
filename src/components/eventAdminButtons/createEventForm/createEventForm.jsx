import React, { useState } from "react";

// Helper for today's date/time
const getTodayDateTime = () => {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
};

const initialState = {
  name: "",
  description: "",
  startDate: getTodayDateTime(),
  endDate: getTodayDateTime(),
  location: "",
  ticketPrice: 0,
  ticketAmount: ""
};

const CreateEventForm = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.location.trim() ||
      !form.ticketPrice ||
      !form.ticketAmount
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    onSubmit(form);
    setForm(initialState);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="dialog-backdrop">
      <div className="dialog">
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          <input name="startDate" type="datetime-local" value={form.startDate} onChange={handleChange} required />
          <input name="endDate" type="datetime-local" value={form.endDate} onChange={handleChange} required />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
          <input name="ticketPrice" type="number" placeholder="Ticket Price" value={form.ticketPrice} onChange={handleChange} required />
          <input name="ticketAmount" type="number" placeholder="Ticket Amount" value={form.ticketAmount} onChange={handleChange} required />
          {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;