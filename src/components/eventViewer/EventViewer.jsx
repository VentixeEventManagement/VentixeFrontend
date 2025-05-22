import React, { useState } from "react";
import "./EventViewer.css";

const eventsData = [
    {
        id: 1,
        title: "Event 1",
        description: "Details about Event 1",
        image: "https://www.hicklingcampsite.co.uk/wp-content/uploads/2016/06/Happisburgh-beach-800x300.jpg",
        location: "New York City",
        startDate: "2025-05-20",
        endDate: "2025-05-22",
        ticketPrice: 50,
        ticketAmount: "100",
    },
    {
        id: 2,
        title: "Event 2",
        description: "cringe",
        image: "https://www.hicklingcampsite.co.uk/wp-content/uploads/2016/06/Happisburgh-beach-800x300.jpg",
        location: "Los Angeles",
        startDate: "2025-06-10",
        endDate: "2025-06-12",
        ticketPrice: 75,
        ticketAmount: "200",
    },
    {
        id: 3,
        title: "Event 3",
        description: "Details about Event 3",
        image: "https://www.hicklingcampsite.co.uk/wp-content/uploads/2016/06/Happisburgh-beach-800x300.jpg",
        location: "Chicago",
        startDate: "2025-07-15",
        endDate: "2025-07-17",
        ticketPrice: 100,
        ticketAmount: "150",
    },
    {
        id: 4,
        title: "Event 4",
        description: "Details about Event 4",
        image: "https://www.hicklingcampsite.co.uk/wp-content/uploads/2016/06/Happisburgh-beach-800x300.jpg",
        location: "San Francisco",
        startDate: "2025-08-01",
        endDate: "2025-08-03",
        ticketPrice: 120,
        ticketAmount: "300",
    },
    {
        id: 5,
        title: "Event 5",
        description: "Details about Event 5",
        image: "https://www.hicklingcampsite.co.uk/wp-content/uploads/2016/06/Happisburgh-beach-800x300.jpg",
        location: "Miami",
        startDate: "2025-09-10",
        endDate: "2025-09-12",
        ticketPrice: 60,
        ticketAmount: "250",
    },
];

const EventViewer = () => {
    const [selectedEvent, setSelectedEvent] = useState(null); 

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const closeDialog = () => {
        setSelectedEvent(null);
    };

    return (
        <div>
            <div className="event-list">
                {eventsData.map((event) => (
                    <div
                        key={event.id}
                        className="event-item"
                        style={{
                            backgroundImage: `url(${event.image})`
                        }}
                        onClick={() => handleEventClick(event)}
                    >
                        <div>
                            <h2>{event.title}</h2>
                        </div>
                    </div>
                ))}
            </div>

            {selectedEvent && (
                <div className="event-modal-overlay" onClick={closeDialog}>
                    <div className="event-modal" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedEvent.title}</h2>
                        <p>{selectedEvent.description}</p>
                        <img
                            src={selectedEvent.image}
                            alt={selectedEvent.title}
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