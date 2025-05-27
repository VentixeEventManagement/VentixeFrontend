import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, updateEvent } from "../../features/eventsSlice";
import "./EventViewer.css";

const EventViewer = ({ isAdmin = false, onDelete }) => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events.items);
    const status = useSelector((state) => state.events.status);
    const error = useSelector((state) => state.events.error);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editForm, setEditForm] = useState(null);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setEditMode(false);
        setEditForm(null);
    };

    const closeDialog = () => {
        setSelectedEvent(null);
        setEditMode(false);
        setEditForm(null);
    };

    const handleEditClick = () => {
        setEditMode(true);
        setEditForm({
            name: selectedEvent.name,
            description: selectedEvent.description,
            location: selectedEvent.location,
            startDate: selectedEvent.startDate.slice(0, 16),
            endDate: selectedEvent.endDate.slice(0, 16),
            ticketPrice: selectedEvent.ticketPrice,
            ticketAmount: selectedEvent.ticketAmount,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditSave = () => {
        dispatch(updateEvent({ id: selectedEvent.id, updatedEvent: editForm }));
        setEditMode(false);
        setEditForm(null);
        setSelectedEvent(null);
    };

    const handleEditCancel = () => {
        setEditMode(false);
        setEditForm(null);
    };

    return (
        <div className="event-viewer-container">
            {status === "loading" && <p>Loading events...</p>}
            {status === "failed" && <p>Error: {error}</p>}
            <div className="event-list">
                {events
                    .slice()
                    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                    .map((event) => (
                        <div
                            key={event.id}
                            className="event-item"
                            style={{
                                backgroundImage: `url(${event.image || "https://www.hicklingcampsite.co.uk/wp-content/uploads/2016/06/Happisburgh-beach-800x300.jpg"})`
                            }}
                            onClick={() => handleEventClick(event)}
                        >
                            <div>
                                <h2>{event.title || event.name}</h2>
                                {isAdmin && (
                                    <button
                                        className="event-delete-btn"
                                        onClick={e => {
                                            e.stopPropagation();
                                            if (onDelete) onDelete(event.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
            </div>

            {selectedEvent && (
                <div className="event-modal-overlay" onClick={closeDialog}>
                    <div className="event-modal" onClick={(e) => e.stopPropagation()}>
                        {editMode ? (
                            <>
                                <h2 className="event-modal-title-edit">
                                    <input
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleEditChange}
                                        className="event-edit-input"
                                    />
                                </h2>
                                <textarea
                                    name="description"
                                    value={editForm.description}
                                    onChange={handleEditChange}
                                    className="event-edit-textarea"
                                />
                                <input
                                    type="text"
                                    name="location"
                                    value={editForm.location}
                                    onChange={handleEditChange}
                                    placeholder="Location"
                                    className="event-edit-input"
                                />
                                <input
                                    type="datetime-local"
                                    name="startDate"
                                    value={editForm.startDate}
                                    onChange={handleEditChange}
                                    className="event-edit-input"
                                />
                                <input
                                    type="datetime-local"
                                    name="endDate"
                                    value={editForm.endDate}
                                    onChange={handleEditChange}
                                    className="event-edit-input"
                                />
                                <input
                                    type="number"
                                    name="ticketPrice"
                                    value={editForm.ticketPrice}
                                    onChange={handleEditChange}
                                    placeholder="Ticket Price"
                                    className="event-edit-input"
                                />
                                <input
                                    type="number"
                                    name="ticketAmount"
                                    value={editForm.ticketAmount}
                                    onChange={handleEditChange}
                                    placeholder="Ticket Amount"
                                    className="event-edit-input"
                                />
                                <div className="event-modal-actions">
                                    <button className="event-modal-close" onClick={handleEditCancel}>
                                        Cancel
                                    </button>
                                    <button className="event-modal-Purchase" onClick={handleEditSave}>
                                        Save
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="event-modal-title">
                                    {selectedEvent.title || selectedEvent.name}
                                    {isAdmin && (
                                        <button
                                            className="event-edit-btn"
                                            onClick={handleEditClick}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </h2>
                                <p>{selectedEvent.description}</p>
                                <img
                                    src={selectedEvent.image || "https://www.hicklingcampsite.co.uk/wp-content/uploads/2016/06/Happisburgh-beach-800x300.jpg"}
                                    alt={selectedEvent.title || selectedEvent.name}
                                    className="event-modal-image"
                                />
                                <p>
                                    <strong>Location:</strong> {selectedEvent.location}
                                </p>
                                <p>
                                    <strong>Start Date:</strong> {new Date(selectedEvent.startDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>End Date:</strong> {new Date(selectedEvent.endDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Ticket Price:</strong> ${selectedEvent.ticketPrice}
                                </p>
                                <p>
                                    <strong>Tickets Available:</strong> {selectedEvent.ticketAmount}
                                </p>
                                <div className="event-modal-actions">
                                    <button className="event-modal-close" onClick={closeDialog}>
                                        Close
                                    </button>
                                    <button className="event-modal-Purchase" onClick={closeDialog}>
                                        Purchase
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventViewer;