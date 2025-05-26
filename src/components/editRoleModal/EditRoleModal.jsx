
import RoleSwitch from "../roleSwitch/RoleSwitch";
import "./EditRoleModal.css";

const EditRoleModal = ({ onClose, userId }) => {

    const handleRoleChange = (newRole) => {
        console.log("Selected role: ", newRole);

    };

    return (
        <div className="edit-modal-wrapper modal">
            <p>Change role</p>
            <RoleSwitch selectedRole="admin" onChange={handleRoleChange} />
            <div className="save-btn-layout">
                <button onClick={onClose}>save</button>
            </div>
        </div>
    )
}

export default EditRoleModal