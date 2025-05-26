import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsersInfo } from "../../../../features/ProfileInfoSlice";
import { GetAllAccounts } from "../../../../features/AuthSlice";
import EditRoleModal from "../../../../components/editRoleModal/EditRoleModal";
import Spinner from "../../../../components/spinner/Spinner"
import "./UserPage.css";

const UserPage = () => {
    const dispatch = useDispatch();
    const { loading, succeeded, allUsersInfo = [], error } = useSelector((state) => state.profileInfo);
    const { accounts = [], updated, loading: accountLoadin, resetStatus } = useSelector((state) => state.auth);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        dispatch(GetAllAccounts());
        dispatch(GetAllUsersInfo());
    }, [dispatch])

    useEffect(() => {
        if (accounts.length > 0 && allUsersInfo.length > 0) {
            const mergedUsers = accounts.map(account => {
                const userInfo = allUsersInfo.find(info => info.userId === account.userId);
                return { ...account, ...userInfo };
            });

            setUsers(mergedUsers);
            resetStatus;
        }

    }, [accounts, allUsersInfo, updated]);

    const refreshData = () => {
        dispatch(GetAllAccounts());
        dispatch(GetAllUsersInfo());
    };

    return (
        <div className="user-page-container">
            {(loading || accountLoadin) && <Spinner />}
            <div className="table-wrapper">
                <table className="user-table">
                    <thead>
                        <tr id="table-head">
                            <th>User ID</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Phone number</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {succeeded && users.map((user) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.email}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.phoneNumber}</td>

                                <td className="edit-role-section">
                                    {user.roleName}
                                    <div className="display-edit-modal-btn">
                                        <button className="edit-role-btn" onClick={() => { setShowModal(true); setSelectedUserId(user.userId) }}>
                                            <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M23.2929 3.29289C23.6834 2.90237 24.3166 2.90237 24.7071 3.29289L28.7071 7.29289C29.0976 7.68342 29.0976 8.31658 28.7071 8.70711L16.7071 20.7071C16.5196 20.8946 16.2652 21 16 21H12C11.4477 21 11 20.5523 11 20V16C11 15.7348 11.1054 15.4804 11.2929 15.2929L23.2929 3.29289ZM13 16.4142V19H15.5858L26.5858 8L24 5.41421L13 16.4142Z" fill="#currentColor" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M20.2929 6.29289C20.6834 5.90237 21.3166 5.90237 21.7071 6.29289L25.7071 10.2929C26.0976 10.6834 26.0976 11.3166 25.7071 11.7071C25.3166 12.0976 24.6834 12.0976 24.2929 11.7071L20.2929 7.70711C19.9024 7.31658 19.9024 6.68342 20.2929 6.29289Z" fill="#currentColor" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H17C17.5523 4 18 4.44772 18 5C18 5.55228 17.5523 6 17 6L6 6L6 26H26V15C26 14.4477 26.4477 14 27 14C27.5523 14 28 14.4477 28 15V26C28 26.5304 27.7893 27.0391 27.4142 27.4142C27.0391 27.7893 26.5304 28 26 28H6C5.46957 28 4.96086 27.7893 4.58579 27.4142C4.21071 27.0391 4 26.5304 4 26V6C4 5.46957 4.21071 4.96086 4.58579 4.58579Z" fill="#currentColor" />
                                            </svg>
                                        </button>
                                        {showModal && selectedUserId === user.userId && <EditRoleModal key={user.id} onClose={() => { setShowModal(false); setSelectedUserId(null) }} userId={user.userId} onRoleUpdate={refreshData} />}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserPage