import React from 'react';
import { useAlert } from '../../context/alert/AlertState';

const Alerts = () => {
  const alertState = useAlert()[0];

  return alertState.length > 0
    ? alertState.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <i className='fas fa-info-circle' /> {alert.msg}
        </div>
      ))
    : null;
};

export default Alerts;
