import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useAuth();
    console.log(loading)

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <progress className="progress progress-info w-56"></progress>
                <p className="mt-4 text-info">Loading, please wait...</p>
            </div>
        )
    }
    if (user) {
        return children
    }
    return <Navigate to={'/joinus'} state={location?.pathname}></Navigate>
};

export default PrivateRoute;