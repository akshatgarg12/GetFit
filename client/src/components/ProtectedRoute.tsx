import {Navigate} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
    element : any
}
 
const ProtectedRoute = ({element}:ProtectedRouteProps) => {
    const {isAuthenticated} = useAuth()

    return (
        isAuthenticated ? element : <Navigate to="/login" replace />
    );
}
 
export default ProtectedRoute;