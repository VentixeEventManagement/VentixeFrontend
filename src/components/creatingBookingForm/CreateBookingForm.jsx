import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./createBookingForm.css";

const CreateBookingForm = ({ onBookingCreated }) => {
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    eventId: eventId,
    date: new Date().toISOString().substring(0, 10),
    userId: "",
    ticketPrice: 0,
    ticketCount: 1,
    totalAmount: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    try {
      const response = await fetch(
        `https://ventixbookingservice-aweebpajf0g7gufx.swedencentral-01.azurewebsites.net/api/events/${eventId}`
      );
      if (response.ok) {
        const event = await response.json();
        setFormData((prev) => ({
          ...prev,
          // I set the eventId to string format since the booking service expects it
          // it didn't work with int format
          eventId: event.id,
          ticketPrice: event.ticketPrice,
        }));
      } else {
        console.error("Failed to fetch event");
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedValue =
        name === "ticketPrice" || name === "ticketCount"
          ? parseFloat(value)
          : value;

      const ticketPrice =
        name === "ticketPrice" ? parseFloat(value) : prev.ticketPrice;
      const ticketCount =
        name === "ticketCount" ? parseFloat(value) : prev.ticketCount;

      const totalAmount =
        name === "ticketPrice" || name === "ticketCount"
          ? ticketPrice * ticketCount
          : prev.totalAmount;

      return {
        ...prev,
        [name]: updatedValue,
        totalAmount,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://ventixbookingservice-aweebpajf0g7gufx.swedencentral-01.azurewebsites.net/api/bookings",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      const result = await response.json();
      alert("Booking created successfully");

      if (onBookingCreated) onBookingCreated(result);
      setFormData({
        eventId: "",
        date: new Date().toISOString().substring(0, 10),
        userId: "",
        ticketPrice: 0,
        ticketCount: 1,
        totalAmount: 0,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
      });
    } else {
      alert("Failed to create booking");
    }
  };

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <h3>Create Booking</h3>
      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      {/* // UserId is not needed for booking creation but I kept it // since the
      since the eventId from event service was set as an int // and the booking
      service expects Guid string format. I tried the conversion // but it
      didn't work. */}
      <input
        name="eventId"
        placeholder="Event ID"
        value={formData.eventId}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <input
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        required
      />
      <input
        name="postalCode"
        placeholder="Postal Code"
        value={formData.postalCode}
        onChange={handleChange}
        required
      />
      <label htmlFor="ticketPrice">Ticket Price</label>
      <input
        name="ticketPrice"
        type="number"
        placeholder="Ticket Price"
        value={formData.ticketPrice}
        onChange={handleChange}
        required
      />
      <label htmlFor="ticketCount">Quantity</label>
      <input
        name="ticketCount"
        type="number"
        placeholder="Quantity"
        value={formData.ticketCount}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Booking</button>
    </form>
  );
};

export default CreateBookingForm;
