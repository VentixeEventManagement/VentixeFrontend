import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "../../../features/invoiceSlice";
import "../css/invoices.css";

const Invoices = () => {
  const dispatch = useDispatch();

  // Hämta fakturor och status från Redux store
  const invoices = useSelector((state) => state.invoices.items);
  const status = useSelector((state) => state.invoices.status);
  const error = useSelector((state) => state.invoices.error);

  // Hämta fakturor när komponenten laddas
  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  return (
    <div>
      <h1>Invoices</h1>
      <div className="invoice-header">VÄLKOMMEN TILL ALLA FAKTUROR!!! :D</div>

      {status === "loading" && <p>Loading Invoices...</p>}
      {status === "failed" && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul>
        {invoices.map((invoice) => (
          <li className="card invoice-card" key={invoice.invoiceId}>
            <div className="invoice-list-id"> {invoice.id} </div>
            <div className="invoice-list-booking-id">
              Booking Id: {invoice.bookingId}
            </div>
            <div className="invoice-list-user-id">UserId: {invoice.userId}</div>
            <div className="invoice-list-event-id">
              EventId: {invoice.eventId}
            </div>
            <div className="invoice-list-issued-date">
              Issued Date: {invoice.issueDate}
            </div>
            <div className="invoice-list-due-date">
              Due Date: {invoice.dueDate}
            </div>

            <div className="invoice-list-total-amount">
              Total Amount: {invoice.totalAmount} SEK{" "}
            </div>
            <div className="invoice-list-status">Status: {invoice.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Invoices;
