import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingErrorDisplay from '@/components/addEstate/assests/LoadingErrorDisplay';

describe('LoadingErrorDisplay', () => {
  it('should display "Loading..." when loading is true', () => {
    render(<LoadingErrorDisplay loading={true} />);
    expect(screen.getByTestId('error-message')).toHaveTextContent('Loading...');
  });

  it('should display the error message when not loading and error is provided', () => {
    const error = new Error('Test error');
    render(<LoadingErrorDisplay loading={false} error={error} />);
    expect(screen.getByTestId('error-message')).toHaveTextContent(`Error: ${error.message}`);
  });

  it('should display "Error:" when not loading and no error message is provided', () => {
    render(<LoadingErrorDisplay loading={false} />);
    expect(screen.getByTestId('error-message')).toHaveTextContent('Error:');
  });
});
