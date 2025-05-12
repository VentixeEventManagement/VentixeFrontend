import React from "react";
import { NavLink } from "react-router-dom";
import SignOutBtn from '../signOutBtn/SignOutBtn'


const Sidebar = () => {
  return (
    <> 
    <div className="sidebar-container-all-links">
      <div className="sidebar-container-link">
        <NavLink
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
          to="/dashboard"
        >
          Dashboard
        </NavLink>
      </div>



      <div className="sidebar-container-link">
        <NavLink className="sidebar-link" to="">
          Bookings
        </NavLink>
      </div>

      <div className="sidebar-container-link">
        <NavLink className="sidebar-link" to="/admin/invoices">
          Invoices
        </NavLink>
      </div>

      <div className="sidebar-container-link">
        <NavLink className="sidebar-link" to="">
          Inbox
        </NavLink>
      </div>

      <div className="sidebar-container-link">
        <NavLink className="sidebar-link" to="">
          Calendar
        </NavLink>
      </div>

      <div className="sidebar-container-link">
        <NavLink className="sidebar-link" to="">
          Events
        </NavLink>
      </div>

      <div className="sidebar-container-link">
        <NavLink className="sidebar-link" to="">
          Financials
        </NavLink>
      </div>

      <div className="sidebar-container-link">
        <NavLink className="sidebar-link" to="">
          Gallery
        </NavLink>
      </div>

      <div className="sidebar-container-link">
        <NavLink className="sidebar-link" to="">
          Feedback
        </NavLink>
      </div>
    </div>


    <SignOutBtn />
      </>
  );
};

export default Sidebar;
