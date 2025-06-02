import React, { useState, useEffect } from "react";
import BookingDetail from "../bookingDetail/BookingDetail";
import { Link } from "react-router-dom";
import axios from "axios";
import "./bookingList.css";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl =
    "https://ventixbookingservice-aweebpajf0g7gufx.swedencentral-01.azurewebsites.net/api/bookings";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        if (response.data.success) {
          setBookings(response.data.response);
        } else {
          setError("Failed to load bookings.");
        }
      } catch (err) {
        console.error("API fetch error:", err);
        setError(`Error fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <div className="booking-container">
        <h2 className="booking-title">Booking List</h2>
        <Link to="/user/bookings" className="create-booking-button">
          Create Booking
        </Link>
        <div className="table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Event Location</th>
                <th>Ticket Price</th>
                <th>Ticket Count</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} onClick={() => setSelectedBooking(b)}>
                  <td>{new Date(b.date).toLocaleString()}</td>
                  <td>{`${b.bookingClient.firstName} ${b.bookingClient.lastName}`}</td>
                  <td>{b.bookingClient.email}</td>
                  <td>{b.bookingClient.phone}</td>
                  <td>{`${b.bookingClient.bookingLocation.address}, ${b.bookingClient.bookingLocation.city}`}</td>
                  <td>{b.ticketPrice}</td>
                  <td>{b.ticketCount}</td>
                  <td>{b.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedBooking && (
          <BookingDetail
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}

        {selectedBooking && (
          <BookingDetail
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
            onUpdated={(updatedBooking) => {
              setBookings((prev) =>
                prev.map((b) =>
                  b.id === updatedBooking.id ? updatedBooking : b
                )
              );
              setSelectedBooking(updatedBooking);
            }}
            onDeleted={(deletedId) => {
              setBookings((prev) => prev.filter((b) => b.id !== deletedId));
            }}
          />
        )}
      </div>
    </>
  );
};

export default BookingList;
