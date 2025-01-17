import { useAuth } from '../utils/useAuth';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
    children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" replace />; // Redirect to homepage or dashboard
    }

    return children;
};

export default PublicRoute;
