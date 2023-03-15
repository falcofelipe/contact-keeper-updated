import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	useAlert,
	setAlert,
	removeAlerts,
} from '../../context/alert/AlertState';
import { useAuth, loginUser, clearErrors } from '../../context/auth/AuthState';

const Login = (props) => {
	const alertDispatch = useAlert()[1];
	const [authState, authDispatch] = useAuth();

	const { error, isAuthenticated } = authState;

	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}

		if (error) {
			setAlert(alertDispatch, error, 'danger');
			clearErrors(authDispatch);
		}
	}, [isAuthenticated, navigate, error, alertDispatch, authDispatch]);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { email, password } = user;

	const onChange = (e) =>
		setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		removeAlerts(alertDispatch);

		if (email === '' || password === '') {
			setAlert(alertDispatch, 'Please fill in all fields', 'danger');
		} else {
			loginUser(authDispatch, {
				email,
				password,
			});
		}
	};

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Login</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={onChange}
					/>
				</div>
				<input
					type='submit'
					value='Login'
					className='btn btn-primary btn-block'
				/>
			</form>
		</div>
	);
};

export default Login;
