'use client';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RequestRemote } from '@/components/RequestRemote';

describe('RequestRemote', () => {
  it('renders the component', () => {
    render(<RequestRemote />);
    expect(screen.getAllByText('Хүсэлт явуулсан огноо:'));
  });
});
