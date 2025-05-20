import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Topbar.css";
import ProfileIconBtn from "../profileIconBtn/ProfileIconBtn";
import { useCookies } from "react-cookie";

const Topbar = () => {
    const location = useLocation();
    const [cookies] = useCookies(["cookie-role"]);
    const [roleName, setRoleName] = useState("");

    useEffect(() => {
        setRoleName(cookies.role);
    }, [cookies])

    const getTitle = (pathname) => {

        switch (pathname) {
            // Admin user pages
            case "/admin/dashboard":
                return "Dashboard";
            case "/admin/invoices":
                return "Invoices";

            // No admin user pages
            case "/dashboard":
                return "Dashboard";

            //Fyll på med varje path
        }
    };

    return (
        <div className="topbar-container header">
            <div className="topbar">
                <div className="topbar-path-container">
                    <div className="topbar-path">
                        Dashboard / {getTitle(location.pathname)}
                    </div>
                    <h1 className="topbar-header">{getTitle(location.pathname)}</h1>
                </div>

                <div className="search-bar-container">
                    <div className="serach-bar">
                        <input placeholder="Search"></input>
                        <button className="serach-icon-btn">
                            <img src="/icons/SearchIcon.svg" alt="search Icon" />
                        </button>
                    </div>
                </div>

                <div className="notification-settings-contianer">
                    Sett Noti
                </div>

                <div className="profile-info-container">
                    <ProfileIconBtn />
                    <div className="name-role">
                        <h3>Björn Åhström</h3>
                        <p>{roleName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
