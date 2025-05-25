import "./HamburgerIcon.css"

const HamburgerIcon = ({ onClicked, isActive }) => {

    const menuClicked = () => {
        if (onClicked) {
            onClicked();
        }
    }

    return (
        <div className={`menu-btn ${isActive ? "active" : ""}`} onClick={menuClicked} aria-label="Toggle menu">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
    )
}

export default HamburgerIcon