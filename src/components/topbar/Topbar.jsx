import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Topbar.css";
import ProfileIconBtn from "../profileIconBtn/ProfileIconBtn";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../features/ProfileInfoSlice";

const Topbar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { loading, error, succeeded, profileInfo, profileImageUpdated } = useSelector((state) => state.profileInfo);
    const [cookies] = useCookies(["cookie-userId", "cookie-role"]);
    const [roleName, setRoleName] = useState("");
    const [name, setName] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        setRoleName(cookies.role);
    }, [cookies])

    useEffect(() => {
        dispatch(getUserInfo(cookies.userId));
    }, [dispatch, cookies.userId, profileImageUpdated])

    useEffect(() => {
        if (profileInfo) {
            setName(`${profileInfo.firstName} ${profileInfo.lastName}`);
            setProfileImage(profileInfo.profileImageUrl)
        }
    }, [profileInfo, profileImage])



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
            case "/profile":
                return "Profile"

            //Fyll på med varje path
        }
    };

    return (
        <div>
            <div className="topbar-container">
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
                        <button>
                            <img src="/icons/NotificationsButtonIcon.svg" alt="Notification button" />
                        </button>
                        <button>
                            <img src="/icons/SettingsButtonIcon.svg" alt="Setting button" />
                        </button>
                    </div>

                    <div className="profile-info-container">
                        <ProfileIconBtn profileImage={profileImage} />
                        <div className="name-role">
                            <h3>{name}</h3>
                            <p>{roleName}</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Topbar;
