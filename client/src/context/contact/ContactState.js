import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  CLEAR_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  CONTACT_ERROR,
  SET_FILTER,
  CLEAR_FILTER,
} from '../types';

// Custom hook to use the contact context
export const useContact = () => {
  const { state, dispatch } = useContext(ContactContext);
  return [state, dispatch];
};

/*--------------- ACTIONS --------------------*/

// Axios Configuration
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Get Contacts
export const getContacts = async dispatch => {
  try {
    const res = await axios.get('/api/contacts');

    dispatch({ type: GET_CONTACTS, payload: res.data });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
  }
};

// Add Contact
export const addContact = async (dispatch, contact) => {
  try {
    const res = await axios.post('/api/contacts', contact, config);

    dispatch({ type: ADD_CONTACT, payload: res.data });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
  }
};

// Delete Contact
export const deleteContact = async (dispatch, id) => {
  try {
    await axios.delete(`/api/contacts/${id}`);

    dispatch({ type: DELETE_CONTACT, payload: id });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
  }
};

// Update Contact
export const updateContact = async (dispatch, contact) => {
  try {
    const res = await axios.put(
      `/api/contacts/${contact._id}`,
      contact,
      config
    );

    dispatch({ type: UPDATE_CONTACT, payload: res.data });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
  }
};

// Clear Contacts
export const clearContacts = async dispatch =>
  dispatch({ type: CLEAR_CONTACTS });

// Set Current Contact
export const setCurrent = (dispatch, contact) => {
  dispatch({ type: SET_CURRENT, payload: contact });
};

// Clear Current Contact
export const clearCurrent = dispatch => {
  dispatch({ type: CLEAR_CURRENT });
};

// Filter Contacts
export const setFilter = (dispatch, text) => {
  dispatch({ type: SET_FILTER, payload: text });
};

// Clear Filter
export const clearFilter = dispatch => {
  dispatch({ type: CLEAR_FILTER });
};

/*---------------- STATE -----------------*/

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filter: '',
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <ContactContext.Provider
      value={{
        state: state,
        dispatch,
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
