import React from "react";
import "./bookingDetail.css";
import axios from "axios";

const BookingDetail = ({ booking, onClose, onDelete }) => {
  if (!booking) return null;

  const { bookingClient, ticketPrice, ticketCount, totalAmount, date } =
    booking;
  const { firstName, lastName, email, phone, bookingLocation } = bookingClient;
  const { address, city } = bookingLocation;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      const response = await axios.delete(
        `https://ventixbookingservice-aweebpajf0g7gufx.swedencentral-01.azurewebsites.net/api/bookings/${booking.id}`,
        { validateStatus: () => true }
      );

      if (response.status >= 200 && response.status < 300) {
        onDelete(booking.id);
        onClose();
      } else {
        console.error("Unexpected delete status:", response.status);
        alert("Failed to delete booking.");
      }
    } catch (err) {
      console.error("Delete error:", err.response || err.message || err);
      alert("An error occurred while deleting.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Booking Details</h2>
        <div className="detail-grid">
          <p>
            <strong>Date:</strong> {new Date(date).toLocaleString()}
          </p>
          <p>
            <strong>Client Name:</strong> {`${firstName} ${lastName}`}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Event Location:</strong> {`${address}, ${city}`}
          </p>
          <p>
            <strong>Ticket Price:</strong> {ticketPrice}
          </p>
          <p>
            <strong>Ticket Count:</strong> {ticketCount}
          </p>
          <p>
            <strong>Total Amount:</strong> {totalAmount}
          </p>
        </div>
        <div className="modal-actions">
          <button className="delete-button" onClick={handleDelete}>
            Delete Booking
          </button>
          <button className="close-modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
