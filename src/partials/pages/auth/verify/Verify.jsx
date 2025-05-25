import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyCode, resetStatus } from "../../../../features/AuthSlice";
import Spinner from "../../../../components/spinner/Spinner";
import "./Verify.css";

const Verify = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, succeeded } = useSelector((state) => state.auth);
    const inputRefs = useRef([]);
    const buttonRef = useRef()
    const [disableBtn, setDisableBtn] = useState(true);
    const location = useLocation();
    const email = location.state?.email;

    useEffect(() => {
        inputRefs.current[0]?.focus();
    })

    useEffect(() => {
        if (succeeded) {
            navigate("/signup/", { state: { email } })
            dispatch(resetStatus());
        }
    }, [succeeded, navigate, disableBtn])

    const handleNumber = (input, index) => {
        const trimedInput = input.trim();

        if (!isNaN(trimedInput) && trimedInput !== "") {

            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            } else {
                buttonRef.current.focus();
                setDisableBtn(false);
            }
        }
    }

    // Took help from ChatGpt
    const handleKeyPress = (e, index) => {
        const allowKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight"];
        if (!/[0-9]/.test(e.key) && !allowKeys.includes(e.key)) {
            e.preventDefault();
        }
        if (e.key === "Backspace") {

            const currentInput = inputRefs.current[index];
            currentInput.value = "";

            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    }

    // Took help from ChatGpt
    const handlePaste = (e) => {
        const paste = e.clipboardData.getData("text").trim();

        if (/^\d{6}$/.test(paste)) {
            [...paste].forEach((char, i) => {
                if (inputRefs.current[i]) {
                    inputRefs.current[i].value = char;
                }
            });

            e.preventDefault();
            if (buttonRef.current && paste.length === 6) {
                buttonRef.current.focus();
            }
        }
    }

    // Took help from ChatGpt
    const extractErrorMessage = () => {
        if (!error || error.length === 0) return null;

        const match = error[0].match(/{.*}/);
        if (match) {
            try {
                const parsed = JSON.parse(match[0]);
                return parsed.message;

            } catch {
                return error[0];
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = inputRefs.current.map(input => input.value).join("");

        dispatch(verifyCode({ email, code }))
    }

    return (
        <div className="modal-wrapper">
            {loading && <Spinner />}
            <div className="modal">
                <div className="modal-header">
                    <h3 className="verify-header-text">Enter the verification code that was sent to {email}</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="verify-cubes">
                        {[...Array(6)].map((_, index) => (
                            <input onKeyDown={(e) => handleKeyPress(e, index)} key={index} type="text" inputMode="numeric" pattern="[0-9]*" maxLength={1} className="cube" onChange={(e) => handleNumber(e.target.value, index)} onPaste={handlePaste} ref={(f) => (inputRefs.current[index] = f)}></input>
                        ))}
                    </div>
                    <button type="submit" ref={buttonRef} className="modal-button" disabled={disableBtn}>Verify</button>

                    {!succeeded && <div className="error-message"><p>{error}</p></div>}
                </form>
            </div>
        </div>
    )
}

export default Verify