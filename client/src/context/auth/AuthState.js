import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

// Custom hook to use state and dispatch
export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

/*--------------------- ACTIONS -----------------------*/

// Axios config parameter
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Load User
export const loadUser = async dispatch => {
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const registerUser = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/users', formData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Login User
export const loginUser = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/auth', formData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Logout User
export const logoutUser = dispatch => dispatch({ type: LOGOUT });

// Clear Errors
export const clearErrors = dispatch => dispatch({ type: CLEAR_ERRORS });

/*------------------------- STATE ------------------------*/

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initial run, while app loads
  setAuthToken(state.token);

  // Load the user when the page loads or reloads
  if (state.loading) {
    loadUser(dispatch);
  }

  // Watch changes to 'token' and save on headers/LS
  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        state: state,
        dispatch,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
