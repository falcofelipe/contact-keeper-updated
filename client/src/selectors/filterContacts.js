const filterContacts = (contacts, filter) => {
  const filteredContacts = contacts.filter(contact => {
    const lcFilter = filter.toLowerCase();
    const name = contact.name ? contact.name.toLowerCase() : '';
    const email = contact.email ? contact.email.toLowerCase() : '';
    const phone = contact.phone ? contact.phone : '';
    return (
      name.includes(lcFilter) ||
      email.includes(lcFilter) ||
      phone.includes(lcFilter)
    );
  });
  return filteredContacts;
};

export default filterContacts;
