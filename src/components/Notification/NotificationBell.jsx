// NotificationBell.jsx – Visar en klockikon som lyser när det finns nya notiser
// Hämtar notiser från backend via API-anrop varje 10:e sekund
// Användar-ID hämtas från en cookie ("cookies-userid")
// Genererad med hjälp av ChatGPT – OpenAI

import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './NotificationBell.css';

function NotificationBell() {
  const { userId } = useContext(UserContext);
  const [hasNew, setHasNew] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = () => {
      fetch(`notificationprovider-btcvdmacescac5e2.swedencentral-01.azurewebsites.net/api/notifications?userId=cookie-userId`)
        .then(res => res.json())
        .then(data => {
          setHasNew(data.hasNew);
          setNotifications(data.notifications);
        })
        .catch(console.error);
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [userId]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setHasNew(false);
  };

  return (
    <div className="notification-wrapper">
      <div className={`bell-icon ${hasNew ? 'active' : ''}`} onClick={toggleDropdown}>
        <img src="./icons/NotificationsButtonIcon.svg"/>
      </div>
      {dropdownOpen && (
        <div className="notification-dropdown">
          {notifications.length === 0 ? (
            <p>Nothing here </p>
          ) : (
            notifications.map((n, i) => <p key={i}>{n.message}</p>)
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;