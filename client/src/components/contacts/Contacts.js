import React, { Fragment, useEffect } from 'react';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { motion, AnimatePresence } from 'framer-motion';
import { useContact, getContacts } from '../../context/contact/ContactState';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import filterContacts from '../../selectors/filterContacts';

const Contacts = () => {
  const [contactState, contactDispatch] = useContact();

  const { contacts, filter, loading } = contactState;

  useEffect(() => {
    getContacts(contactDispatch);
  }, [contactDispatch]);

  let filteredContacts;

  if (contacts !== null && !loading) {
    filteredContacts = filterContacts(contacts, filter);
  } else {
    filteredContacts = contacts;
  }

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        filter !== '' ? (
          <AnimatePresence>
            {filteredContacts.map(contact => (
              <motion.div
                layout
                key={contact._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: 0.5 }}
                transition={{ delay: 0.2 }}>
                <ContactItem contact={contact} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            {contacts.map(contact => (
              <motion.div
                layout
                key={contact._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: 0.5 }}
                transition={{ delay: 0.2 }}>
                <ContactItem contact={contact} />
              </motion.div>
            ))}
          </AnimatePresence>
        )
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
