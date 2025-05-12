import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../features/AuthSlice';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import SvgIcon from "../svgIcon/SvgIcon"
import "./SignOutBtn.css"

const SignOutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-userId']);

    const handleSignOut = () => {
        removeCookie("userId", { path: "/" });
        dispatch(signOut());
        navigate("/login");
    }

    return (
        <button className="signout-btn-container" onClick={handleSignOut}>
            <img src="/icons/SignOutIcon.svg" alt="Sign out icon" />
            <p>Sign Out</p>
        </button>
    )
}

export default SignOutBtn