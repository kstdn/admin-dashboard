import React from 'react';
import { Button } from '../shared/components/Button';

export const Dashboard = () => {
  return (
    <div>
      Dashboard
      <div>
        <Button onClick={() => alert('CLICK')}>Submit</Button>
      </div>
    </div>
  );
};
