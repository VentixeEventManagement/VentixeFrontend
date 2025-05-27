import React from "react";
import EventViewer from "../../../components/eventViewer/EventViewer.jsx";
import EventAdminButtons from "../../../components/eventAdminButtons/eventAdminButtons.jsx";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../../features/eventsSlice";

const Events = () => {
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteEvent(id));
    };

    return (
        <div>
            <h1>Admin Events Page</h1>
            <div>
                <EventAdminButtons />
                <EventViewer isAdmin={true} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default Events;