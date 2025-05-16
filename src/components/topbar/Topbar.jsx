import React from "react";
import { useLocation } from "react-router-dom";
import "./Topbar.css";

const Topbar = () => {
  const location = useLocation();

  const getTitle = (pathname) => {
    switch (pathname) {
      case "/admin/invoices":
        return "Invoices";
      //Fyll på med varje path
    }
  };
  return (
    <>
      <div className="topbar">
        <div className="topbar-path">
          Dashboard / {getTitle(location.pathname)}
        </div>
        <h1 className="topbar-header">{getTitle(location.pathname)}</h1>
      </div>
    </>
  );
};

export default Topbar;
