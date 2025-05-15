import React, { useState } from "react";

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
    {
        id: 6,
        title: "Event 6",
        description: "Details about Event 6",
        image: "https://www.hicklingcampsite.co.uk/wp-content/uploads/2016/06/Happisburgh-beach-800x300.jpg",
        location: "Seattle",
        startDate: "2025-10-05",
        endDate: "2025-10-07",
        ticketPrice: 80,
        ticketAmount: "180",
    },
    {
        id: 7,
        title: "Event 7",
        description: "Details about Event 7",
        image: "https://www.hicklingcampsite.co.uk/wp-content/uploads/2016/06/Happisburgh-beach-800x300.jpg",
        location: "Boston",
        startDate: "2025-11-15",
        endDate: "2025-11-17",
        ticketPrice: 90,
        ticketAmount: "220",
    },
    {
        id: 8,
        title: "Event 8",
        description: "Details about Event 8",
        image: "https://www.hicklingcampsite.co.uk/wp-content/uploads/2016/06/Happisburgh-beach-800x300.jpg",
        location: "Austin",
        startDate: "2025-12-01",
        endDate: "2025-12-03",
        ticketPrice: 70,
        ticketAmount: "150",
    },
];

const Events = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const closeDialog = () => {
        setSelectedEvent(null);
    };

    return (
        <div>
            <h1>Events Page</h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    maxHeight: "400px", // Set max height for the list
                    overflowY: "auto", // Add vertical scroll bar
                    border: "1px solid #ccc", // Optional: Add border for better visibility
                    padding: "1rem",
                    borderRadius: "8px",
                    
                }}
            >
                {eventsData.map((event) => (
                    <div
                        key={event.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            border: "1px solid #ccc",
                            padding: "1rem",
                            borderRadius: "8px",
                            backgroundImage: `url(${event.image})`, // Set the image as the background
                            backgroundSize: "cover", // Ensure the image covers the entire div
                            backgroundPosition: "center", // Center the image
                            color: "#fff", // Ensure text is visible on the background
                            height: "150px", // Set a fixed height for the item
                         
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
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onClick={closeDialog}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "2rem",
                            borderRadius: "8px",
                            maxWidth: "500px",
                            width: "100%",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>{selectedEvent.title}</h2>
                        <p>{selectedEvent.description}</p>
                        <img
                            src={selectedEvent.image}
                            alt={selectedEvent.title}
                            style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
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
                        <button onClick={closeDialog} style={{ padding: "0.5rem 1rem" }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;