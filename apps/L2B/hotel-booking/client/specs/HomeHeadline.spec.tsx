import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomeHeadline } from '@/app/_components/HomeHeadline';

describe('Home Headline', () => {
  it('render component', () => {
    render(<HomeHeadline />);
    expect(screen.getByText('Find the Best Hotel for Your Stay')).toBeInTheDocument();
  });
});
