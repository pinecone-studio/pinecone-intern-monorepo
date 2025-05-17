import SearchCard from '@/app/_components/Card/SearchCard';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('SearchCard', () => {
  it('render SearchCard component', () => {
    const { getByTestId } = render(<SearchCard />);
    expect(getByTestId('searchcard-component')).toBeInTheDocument();
  });
});
