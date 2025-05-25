import { useState } from "react";
import HamburgerIcon from "../hamburgerIcon/HamburgerIcon"
import MobileMenu from "../mobileMenu/MobileMenu";
import { useLocation } from "react-router-dom";
import "./MobileTopbar.css"

const MobileTopbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

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
            case "/events":
                return "Events";
            case "/calendar":
                return "Events";

            //Fyll på med varje path
        }
    };


    return (
        <div className="app-wrapper">
            <div className="mobile-topbar-wrapper">
                <div className="mobile-topbar-container">
                    <div className="menu-logo">
                        <img src="/icons/tabletLogo.svg" alt="Logo icon" />
                    </div>
                    <div className="menu-page-header">
                        <h1 className="topbar-header">{getTitle(location.pathname)}</h1>
                    </div>
                    <HamburgerIcon onClicked={toggleMenu} isActive={isMenuOpen} />
                </div>
            </div>
            <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
        </div>
    )
}

export default MobileTopbar