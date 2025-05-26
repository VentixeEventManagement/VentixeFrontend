import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getUserInfo } from "../../../../features/ProfileInfoSlice";
import { getAccountInfo } from "../../../../features/AuthSlice";
import { useCookies } from "react-cookie";
import Spinner from "../../../../components/spinner/Spinner";
import { AddUserProfileInfo } from "../../../../features/ProfileInfoSlice";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileInputRef = useRef();
    const { loading: profileLoading, error: profileError, succeeded: profileSucceeded, profileInfo, resetStatus } = useSelector((state) => state.profileInfo);
    const { user, succeeded: userSucceeded, loading: userLoading } = useSelector((state) => state.auth);
    const [cookies] = useCookies(["cookie-userId", "cookie-role"]);

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [postaCode, setPostalcode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("/profileImages/avatar.svg");

    const [hasFetched, setHasFetched] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (cookies.userId) {
            dispatch(getAccountInfo(cookies.userId))
        }

    }, [cookies.userId, dispatch])

    useEffect(() => {
        if (profileInfo) {
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    }, [profileInfo]);

    useEffect(() => {
        if (user) {
            setPhoneNumber(user.phoneNumber || "");
            setEmail(user.email || "");
        }
    }, [user])

    useEffect(() => {

        if (profileInfo) {
            if (profileInfo?.profileImageUrl && !selectedFile) {
                setImagePreview(profileInfo.profileImageUrl);
            }

            setFirstName(profileInfo.firstName || "");
            setLastName(profileInfo.lastName || "");
            setCity(profileInfo.city || "");
            setPostalcode(profileInfo.postalCode || "");
        }
    }, [profileInfo, selectedFile])

    const handleUploadNewImage = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    }

    const handleNewUserInformation = () => {
        const user = {
            userId: cookies.userId,
            selectedFile: selectedFile,
            firstName: firstName,
            lastName: lastName
        };

        const isFirstNameEmpty = !firstName || firstName.trim() === "";
        const isLastNameEmpty = !lastName || lastName.trim() === "";

        if (!isFirstNameEmpty && !isLastNameEmpty) {
            dispatch(AddUserProfileInfo(user));
        } else {
            console.log("All fields are empty");
        }
    }

    const handleUpdate = () => {
        if (isEditing) {
            const user = {
                userId: cookies.userId,
                selectedFile: selectedFile,
                firstName: firstName,
                lastName: lastName
            };

            dispatch(updateUser(user));
        }
        setIsEditing(prev => !prev);
    }

    const handleClose = () => {
        navigate("/dashboard");
    }

    return (
        <div className="profile-image-container">
            {profileLoading || userLoading && <Spinner />}
            <aside className="image-modal modal">
                <div className="image-hedaer">
                    <h2>Profile Picture</h2>
                </div>
                <div className="profile-image">
                    <img src={imagePreview} alt="Profile picture" />
                </div>

                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />

                <div className="image-footer">
                    <button disabled={!isEditing} onClick={handleUploadNewImage}>Upload new image</button>
                </div>
            </aside>
            <div className="account-details-container modal">
                <div className="account-details-header">
                    <h2>Account details</h2>
                </div>
                <div className="account-details">
                    <input className="account-details-input" type="email" disabled={true} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className="account-details-inputs">
                        <div className="account-details-left">
                            <input className="account-details-input" type="text" disabled={!isEditing} placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <input className="account-details-input" type="text" disabled={!isEditing} placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                            <input className="account-details-input" type="text" disabled={!isEditing} placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>

                        <div className="account-details-right">
                            <input className="account-details-input" type="text" disabled={!isEditing} placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <input className="account-details-input" type="text" disabled={!isEditing} placeholder="Postal code" value={postaCode} onChange={(e) => setPostalcode(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="account-details-footer">
                    {profileInfo === null ? <button onClick={handleNewUserInformation}>Add your information</button> : <button onClick={handleUpdate}>{isEditing ? "Update" : "Edit"}</button>}
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage