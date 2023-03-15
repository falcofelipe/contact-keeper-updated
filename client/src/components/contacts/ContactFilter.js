import React from 'react';
import {
  useContact,
  setFilter,
  clearFilter,
} from '../../context/contact/ContactState';

const ContactFilter = () => {
  const contactDispatch = useContact()[1];

  const onChange = e => {
    if (e.target.value !== '') {
      setFilter(contactDispatch, e.target.value); // or text.current.value
    } else {
      clearFilter(contactDispatch);
    }
  };

  return (
    <form>
      <input type='text' placeholder='Filter Contacts...' onChange={onChange} />
    </form>
  );
};

export default ContactFilter;
