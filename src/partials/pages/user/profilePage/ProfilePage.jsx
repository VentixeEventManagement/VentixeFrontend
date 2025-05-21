import "./ProfilePage.css";

const ProfilePage = () => {
    return (
        <div className="profile-image-container">
            <aside className="image-modal modal">
                <header className="image-card-hedaer">
                    <h2>Profile Picture</h2>
                </header>
            </aside>

            <div className="account-details-container modal">Account details</div>
        </div>
    )
}

export default ProfilePage