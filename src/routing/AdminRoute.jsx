import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'

const AdminRoute = ({ children }) => {

    try {
        const [cookies] = useCookies(['cookie-userId']);
        const userId = cookies.userId;
        const isAdmin = true;

        if (isAdmin && userId) {
            if (!isAdmin) {
                return <Navigate to="/denied" replace />
            }

            return children
        }
        return <Navigate to="/login" replace />

    }
    catch { }

}

export default AdminRoute