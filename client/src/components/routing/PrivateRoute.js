import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthState';

const PrivateRoute = ({ children }) => {
	//...rest accepts an indefinite nr of arguments as an array

	const authState = useAuth()[0];
	const { isAuthenticated, loading } = authState;

	return !isAuthenticated && !loading ? <Navigate to='/login' /> : children;
};

export default PrivateRoute;
