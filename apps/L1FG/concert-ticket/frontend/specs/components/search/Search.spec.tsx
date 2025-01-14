import { SearchConcert } from '@/components/searchSection/Search';

import { fireEvent, render } from '@testing-library/react';

const mockSelectedDate = jest.fn();
const mockSearchArtist = jest.fn();
describe('search component', () => {
  it('renders the input', async () => {
    const { getByTestId } = render(<SearchConcert selected={new Date()} onSelect={mockSelectedDate} onChange={mockSearchArtist} />);
    const input = getByTestId('search-input');
    expect(input).toBeDefined();
  });
  it('renders the input without selected Date', async () => {
    const { getByTestId } = render(<SearchConcert selected={undefined} onSelect={mockSelectedDate} onChange={mockSearchArtist} />);
    const input = getByTestId('search-input');
    expect(input).toBeDefined();
  });
  it('onChange fixed', async () => {
    const { getByTestId } = render(<SearchConcert selected={undefined} onSelect={mockSelectedDate} onChange={mockSearchArtist} />);
    const input = getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Search' } });
    expect(input).toBeDefined();
  });
});
