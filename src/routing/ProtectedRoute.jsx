import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children }) => {
    try {
        const [cookies] = useCookies(['cookie-userId']);
        const userId = cookies.userId;

        console.log("isAuthenticated ", userId);

        if (userId) {
            return children
        }
    }
    catch { }

    return <Navigate to="/login" replace />
}

export default ProtectedRoute