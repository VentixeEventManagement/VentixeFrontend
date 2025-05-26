

import { useState } from "react"
import "./RoleSwitch.css"

// Took help from ChatGpt
const RoleSwitch = ({ selectedRole, onChange }) => {
    const [role, setRole] = useState(selectedRole || "user");

    const roles = {
        Admin: "Admin",
        User: "User"
    }

    const toggleRole = (newRole) => {
        setRole(newRole);
        onChange(newRole);
    };

    return (
        <div className="role-switch">
            {Object.entries(roles).map(([key, label]) => (
                <button
                    key={key}
                    className={`role-btn ${role === key ? "active" : ""}`}
                    onClick={() => toggleRole(key)}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}

export default RoleSwitch