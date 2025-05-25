import "./ProfileIconBtn.css"
import { useNavigate } from "react-router-dom"

const ProfileIconBtn = ({ profileImage }) => {
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate("/profile");
    }

    return (
        <button className="profile-container" onClick={goToProfile}>
            <img src={profileImage ?? "/profileImages/avatar.svg"} alt="Profile image" />
        </button>
    )
}

export default ProfileIconBtn