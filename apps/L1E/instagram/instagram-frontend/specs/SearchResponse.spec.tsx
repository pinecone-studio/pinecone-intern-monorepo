import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResponse from '@/components/search/SearchResponse';

describe('SearchResponse', () => {
  it('renders loading state', () => {
    render(<SearchResponse loading={true} error={undefined} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<SearchResponse loading={false} error={{ message: 'Something went wrong' }} />);
    expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument();
  });

  it('renders nothing when not loading and no error', () => {
    render(<SearchResponse loading={false} error={undefined} />);
    const container = screen.getByTestId('search-response');
    expect(container).toBeEmptyDOMElement();
  });
});