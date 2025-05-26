
import RoleSwitch from "../roleSwitch/RoleSwitch";
import "./EditRoleModal.css";

const EditRoleModal = ({ onClose, useId }) => {
    
    const handleRoleChange = (newRole) => {
        console.log("Selected role: ", newRole);

    };

    return (
        <div className="edit-modal-wrapper modal">
            <p>Edit role</p>
            <RoleSwitch selectedRole="admin" onChange={handleRoleChange} />
            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default EditRoleModal