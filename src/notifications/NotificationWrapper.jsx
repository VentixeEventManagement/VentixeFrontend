// Genererad med hjälp av ChatGPT – OpenAI

import React from 'react';
import NotificationBell from '../components/Notification/NotificationBell';
import { UserContext } from '../contexts/UserContext';

function NotificationWrapper() {
  const user = { userId: 'cookie-userId' };

  return (
    <UserContext.Provider value={user}>
      <div style={{ position: 'fixed', top: 10, right: 20, zIndex: 2000 }}>
        <NotificationBell />
      </div>
    </UserContext.Provider>
  );
}

export default NotificationWrapper;