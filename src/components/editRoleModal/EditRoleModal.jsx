import { updateRole } from "../../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import RoleSwitch from "../roleSwitch/RoleSwitch";
import "./EditRoleModal.css";

const EditRoleModal = ({ onClose, userId, onRoleUpdate }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.accounts.find(u => u.userId === userId));

    const handleRoleChange = (roleName) => {
        dispatch(updateRole({ userId, roleName }))
        onRoleUpdate()
        onClose()
    };

    return (
        <div className="edit-modal-wrapper modal">
            <p>Change role</p>
            <RoleSwitch selectedRole={user?.roleName} onChange={handleRoleChange} />
        </div>
    )
}

export default EditRoleModal