import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchNoResult from '@/components/search/SearchNoResult';

describe('SearchNoResult', () => {
  it('renders "No Result" when not loading, no error, and searchName is provided', () => {
    render(<SearchNoResult loading={false} error={undefined} searchName="john" />);
    expect(screen.getByTestId('no-result')).toBeInTheDocument();
  });

  it('does not render when loading', () => {
    render(<SearchNoResult loading={true} error={undefined} searchName="john" />);
    expect(screen.queryByTestId('no-result')).not.toBeInTheDocument();
  });

  it('does not render when error exists', () => {
    render(<SearchNoResult loading={false} error={{ message: 'Error' }} searchName="john" />);
    expect(screen.queryByTestId('no-result')).not.toBeInTheDocument();
  });

  it('does not render when searchName is empty', () => {
    render(<SearchNoResult loading={false} error={undefined} searchName="" />);
    expect(screen.queryByTestId('no-result')).not.toBeInTheDocument();
  });
});