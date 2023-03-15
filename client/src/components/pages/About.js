import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About This App</h1>
      <p className='my-1'>
        This is a fullstack React app for keeping contacts. It allows for
        adding, deleting and updating contacts to your account-specific contact
        list.
      </p>
      <p className='bg-dark p'>
        <strong>Version: </strong>1.0.0
      </p>
    </div>
  );
};

export default About;
