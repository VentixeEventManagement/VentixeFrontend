import "./ProfileIconBtn.css"
import { useNavigate } from "react-router-dom"

const ProfileIconBtn = () => {
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate("/profile");
    }

    return (
        <button className="profile-container" onClick={goToProfile}>
            <img src="/profileImages/avatar.svg" alt="Profile image" />
        </button>
    )
}

export default ProfileIconBtn