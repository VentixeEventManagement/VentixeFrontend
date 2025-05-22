import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInvoices,
  fetchInvoiceById,
  deleteInvoice,
  updateInvoice,
} from "../../../features/invoiceSlice";
import "../css/invoices.css";
import Spinner from "../../../components/spinner/Spinner";

const Invoices = () => {
  const dispatch = useDispatch();

  // Hämta fakturor och status från Redux store
  const invoices = useSelector((state) => state.invoices.items);
  const selectedInvoice = useSelector((state) => state.invoices.selected);
  const status = useSelector((state) => state.invoices.status);
  const error = useSelector((state) => state.invoices.error);

  const [isEditing, setIsEditing] = useState(false);
  const [editedInvoice, setEditedInvoice] = useState(null);

  // Hämta fakturor när komponenten laddas
  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  useEffect(() => {
    setEditedInvoice(selectedInvoice);
  }, [selectedInvoice]);

  //Hämta enskild faktura:
  const handleSelectedInvoice = (id) => {
    dispatch(fetchInvoiceById(id));
  };

  //Delete faktura:
  const handleDelete = (id) => {
    if (window.confirm("Confirm deletion of Invoice")) {
      dispatch(deleteInvoice(id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch(
      updateInvoice({
        id: editedInvoice.invoiceId,
        updatedInvoice: editedInvoice,
      })
    );
  };

  return (
    <div className="invoice-page-container">
      <div className="invoice-list-container">
        <div className="invoice-header">Invoice List</div>

        {status === "loading" && <Spinner />}
        {status === "failed" && (
          <p style={{ color: "red" }}>Error: Loading API{error}</p>
        )}
        <ul className="invoice-list-ul">
          {invoices.map((invoice) => (
            <li
              className="invoice-card"
              key={invoice.invoiceId}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectedInvoice(invoice.invoiceId);
              }}
            >
              <div className="invoice-list-id"> INV{invoice.invoiceId} </div>

              <div className="invoice-list-due-date">
                <img src="/icons/Vector.svg" alt="Calendar icon" />
                {invoice.dueDate}
              </div>
              <div className="invoice-list-total-amount">
                ${invoice.totalAmount}
              </div>
              <div className="invoice-list-status">{invoice.status}</div>
            </li>
          ))}
        </ul>
      </div>

      {selectedInvoice && (
        <div className="selected-invoice-container">
          <div className="header-invoice-details">Invoice Details</div>
          <div className="second-selected-invoice-container">
            <div className="third-selected-invoice-container">
              <div className="invoice-id">
                <img src="/icons/hashtag.svg" alt="Hashtag" />
                INV{selectedInvoice.invoiceId}
              </div>
              <div className="invoice-status">{selectedInvoice.status}</div>
              <div className="invoice-booking-id">
                Booking Id: {selectedInvoice.bookingId}
              </div>
              <div className="invoice-user-id">
                UserId: {selectedInvoice.userId}
              </div>
              <div className="invoice-event-id">
                EventId: {selectedInvoice.eventId}
              </div>
              <div className="invoice-issued-date">
                Issued Date: {selectedInvoice.issueDate}
              </div>
              <div className="invoice-total-amount">
                Total Amount: {selectedInvoice.totalAmount} SEK
              </div>
              <div className="invoice-due-date">
                Due Date:{"    "}
                {isEditing ? (
                  <input
                    type="date"
                    value={editedInvoice.dueDate}
                    onChange={(e) =>
                      setEditedInvoice({
                        ...editedInvoice,
                        dueDate: e.target.value,
                      })
                    }
                  />
                ) : (
                  selectedInvoice.dueDate
                )}
              </div>
            </div>
            {isEditing && (
              <>
                <button
                  className="invoice-button invoice-save-button"
                  onClick={() => {
                    dispatch(
                      updateInvoice({
                        id: editedInvoice.invoiceId,
                        updatedInvoice: editedInvoice,
                      })
                    );
                    setIsEditing(false);
                  }}
                >
                  Save
                </button>

                <button
                  className="invoice-button invoice-cancel-button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedInvoice(null);
                  }}
                >
                  Cancel
                </button>
              </>
            )}

            {!isEditing && (
              <>
                <button
                  className="invoice-button invoice-edit-button"
                  onClick={() => {
                    setIsEditing(true);
                    setEditedInvoice({ ...selectedInvoice });
                  }}
                >
                  Edit
                </button>
              </>
            )}

            <button
              className="invoice-button invoice-delete-button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(selectedInvoice.invoiceId);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
