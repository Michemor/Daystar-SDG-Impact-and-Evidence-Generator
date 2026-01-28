import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem('access_token');
    const location = useLocation();

    if (!token) {
        // Redirect to login page but save the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}