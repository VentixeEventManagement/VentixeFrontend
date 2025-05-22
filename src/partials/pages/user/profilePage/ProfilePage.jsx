import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../../features/ProfileInfoSlice";
import "./ProfilePage.css";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { loading, error, succeeded } = useSelector((state) => state.update);

    const [email, setEmail] = useState("bjorn1@domain.com");
    const [firsName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [postaCode, setPostalcode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const fileInputRef = useRef();
    const [selectedFileName, setSelectedFileName] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);


    const handleButtonClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFileName(file.name);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            console.log("Selected file: ", file);

        }
    }

    const handleUpdate = () => {
        console.log("KLICKELIKLICK");

        const user = {
            firstName: "test"
        }

        dispatch(updateUser(user));
    }

    return (
        <div className="profile-image-container">
            <aside className="image-modal modal">
                <div className="image-hedaer">
                    <h2>Profile Picture</h2>
                </div>
                <div className="profile-image">
                    <img src={imagePreview || "/profileImages/avatar.svg"} alt="Profile picture" />
                </div>

                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />

                <div className="image-footer">
                    <button onClick={handleButtonClick}>Upload new image</button>
                </div>
            </aside>

            <div className="account-details-container modal">
                <div className="account-details-header">
                    <h2>Account details</h2>
                </div>
                <div className="account-details">
                    <input className="account-details-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className="account-details-inputs">
                        <div className="account-details-left">
                            <input className="account-details-input" type="text" placeholder="First name" value={firsName} onChange={(e) => setFirstName(e.target.value)} />
                            <input className="account-details-input" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                            <input className="account-details-input" type="text" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>

                        <div className="account-details-right">
                            <input className="account-details-input" type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <input className="account-details-input" type="text" placeholder="Postal code" value={postaCode} onChange={(e) => setPostalcode(e.target.value)} />
                        </div>
                    </div>

                </div>
                <div className="account-details-footer">
                    <button onClick={handleUpdate}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage