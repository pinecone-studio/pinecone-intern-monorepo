import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MyRequest } from '@/components/MyRequest';

describe('MyRequest Component', () => {
  it('renders all child components with correct props', () => {
    render(<MyRequest availableDays={5} availablePaidDays={3} timeleave={2} />);
  });
});
