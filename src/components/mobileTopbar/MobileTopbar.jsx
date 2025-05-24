import { useState } from "react";
import HamburgerIcon from "../hamburgerIcon/HamburgerIcon"
import "./MobileTopbar.css"
import MobileMenu from "../mobileMenu/MobileMenu";

const MobileTopbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    return (
        <div className="app-wrapper">
            <div className="mobile-topbar-wrapper">
                <div className="mobile-topbar-container">
                    <div className="menu-logo">
                        <img src="/icons/tabletLogo.svg" alt="Logo icon" />
                    </div>
                    <div className="menu-page-label">
                        label
                    </div>
                    <HamburgerIcon onClicked={toggleMenu} isActive={isMenuOpen} />
                </div>
            </div>
            <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
        </div>
    )
}

export default MobileTopbar