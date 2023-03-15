import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	useAlert,
	setAlert,
	removeAlerts,
} from '../../context/alert/AlertState';
import {
	useAuth,
	registerUser,
	clearErrors,
} from '../../context/auth/AuthState';

const Register = (props) => {
	const alertDispatch = useAlert()[1];
	const [authState, authDispatch] = useAuth();

	const { error, isAuthenticated } = authState;

	const navigate = useNavigate();

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		passwordConf: '',
	});

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}

		if (error) {
			setAlert(alertDispatch, error, 'danger');
			clearErrors(authDispatch);
		}
	}, [error, isAuthenticated, navigate, alertDispatch, authDispatch]);

	const { name, email, password, passwordConf } = user;

	const onChange = (e) =>
		setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		removeAlerts(alertDispatch);

		if (name === '' || email === '' || password === '') {
			setAlert(alertDispatch, 'Please fill in all fields', 'danger');
		} else if (password !== passwordConf) {
			setAlert(alertDispatch, 'Passwords do not match', 'danger');
		} else {
			registerUser(authDispatch, { name, email, password });
		}
	};

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Register</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						name='name'
						value={name}
						onChange={onChange}
					/>
				</div>
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
						minLength='6'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='passwordConf'>Confirm your password</label>
					<input
						type='password'
						name='passwordConf'
						value={passwordConf}
						onChange={onChange}
						minLength='6'
					/>
				</div>
				<input
					type='submit'
					value='Register'
					className='btn btn-primary btn-block'
				/>
			</form>
		</div>
	);
};

export default Register;
