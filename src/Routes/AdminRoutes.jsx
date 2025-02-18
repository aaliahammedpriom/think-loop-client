import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
import Loading from '../Pages/Shared/Loading';

const AdminRoutes = ({children}) => {
    const {user ,loading} = useAuth();
    const [isAdmin , isAdminLoading] = useAdmin();
    const location = useLocation();
    if(loading || isAdminLoading){
        return <Loading></Loading>
    }
    if(user && isAdmin){
        return children
    }
    return <Navigate state={{from:location}} to={"/joinus"} replace></Navigate>
};

export default AdminRoutes;