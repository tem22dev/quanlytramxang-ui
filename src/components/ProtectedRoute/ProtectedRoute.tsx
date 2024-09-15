import React from 'react';
import { useAppSelector } from '../../hooks';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useAppSelector((state) => state.account.isAuthenticated);

    return <>{!!isAuthenticated === true ? <>{children}</> : <Navigate to="/login" replace />}</>;
};

export default ProtectedRoute;
