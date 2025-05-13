import React from 'react';

const ThirdStep = ({ email }: { email: string }) => {
  return (
    <div data-testid="3step">
      <p>{email}</p>
    </div>
  );
};

export default ThirdStep;
