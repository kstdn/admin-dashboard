import React from 'react';
import { useHistory } from 'react-router-dom';

export const PageError = () => {
  const history = useHistory();

  const redirect = () => history.push('/');

  return (
    <div>
      There has been an error
      <button onClick={redirect}>Go to Dashboard</button>
    </div>
  );
};
