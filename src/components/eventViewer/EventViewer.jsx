import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../features/eventsSlice";
import "./EventViewer.css";

const EventViewer = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events.items);
    const status = useSelector((state) => state.events.status);
    const error = useSelector((state) => state.events.error);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const closeDialog = () => {
        setSelectedEvent(null);
    };

    return (
        <div>
            {status === "loading" && <p>Loading events...</p>}
            {status === "failed" && <p>Error: {error}</p>}
            <div className="event-list">
                {events.map((event) => (
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
                        </div>
                    </div>
                ))}
            </div>

            {selectedEvent && (
                <div className="event-modal-overlay" onClick={closeDialog}>
                    <div className="event-modal" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedEvent.title || selectedEvent.name}</h2>
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
                        <button className="event-modal-close" onClick={closeDialog}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventViewer;