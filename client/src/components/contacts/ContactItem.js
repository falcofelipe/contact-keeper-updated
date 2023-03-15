import React from 'react';
import PropTypes from 'prop-types';
import {
  useContact,
  deleteContact,
  setCurrent,
  clearCurrent,
} from '../../context/contact/ContactState';

const ContactItem = ({ contact }) => {
  const contactDispatch = useContact()[1];

  const { _id, name, email, phone, type } = contact;

  const onDelete = e => {
    deleteContact(contactDispatch, _id);
    clearCurrent(contactDispatch);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }>
          {/* Makes the first letter uppercase */}
          {type.charAt(0).toUpperCase() + type.slice(1)}{' '}
        </span>{' '}
      </h3>
      <ul className='list'>
        {email ? (
          <li>
            <i className='fas fa-envelope-open'></i> {email}
          </li>
        ) : null}
        {phone ? (
          <li>
            <i className='fas fa-phone'></i> {phone}
          </li>
        ) : null}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contactDispatch, contact)}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
