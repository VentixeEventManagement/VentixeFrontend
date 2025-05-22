import "./ProfilePage.css";

const ProfilePage = () => {
    return (
        <div className="profile-image-container">
            <aside className="image-modal modal">
                <div className="image-hedaer">
                    <h2>Profile Picture</h2>
                </div>
                <div className="profile-image">
                    <img src="/profileImages/avatar.svg" alt="Profile picture" />
                </div>
                <div className="image-footer">
                    <button>Upload new image</button>
                </div>
            </aside>

            <div className="account-details-container modal">
                <div className="account-details-header">
                    <h2>Account details</h2>
                </div>
                <div className="account-details">
                    <div className="account-details-left">
                        <input className="account-details-input" type="text" placeholder="First name" />
                    </div>
                    <div className="account-details-right">
                        <input className="account-details-input" type="text" placeholder="Last name" />
                    </div>
                </div>
                <div className="account-details-footer">
                    <button>Save</button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage