import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; 
import { simulateLogin } from "../../features/AuthSlice";

const SkipAuthButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [, setCookie] = useCookies(["cookie-userId"]); 
    const handleSkipAuth = () => {
        dispatch(simulateLogin());
        setCookie("userId", "1", { path: "/" });
        navigate("/dashboard");
    };

    return (
        <button onClick={handleSkipAuth}>
            Skip Authentication
        </button>
        
    );
};

export default SkipAuthButton;