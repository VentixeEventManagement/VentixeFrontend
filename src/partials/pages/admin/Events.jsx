// filepath: c:\Users\marti\OneDrive\Documents\VentixeFrontend\src\partials\pages\user\Events.jsx
import React from "react";
import EventViewer from "../../../components/eventViewer/EventViewer.jsx";
import EventAdminButtons from "../../../components/eventAdminButtons/eventAdminButtons.jsx";

const Events = () => {
    return (
        <div>
            <h1>Admin Events Page</h1>
           <div>
            <EventAdminButtons/>
            <EventViewer />
           </div>
        </div>
    );
};

export default Events;