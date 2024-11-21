import { UserProfile } from '@/components/maincomponents/UserProfile';
import { fireEvent, render } from '@testing-library/react';

describe('UserProfile', () => {
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(<UserProfile />);

    const searchInput = getByTestId('searchinput');
    expect(searchInput)

    fireEvent.input(searchInput, { target: { value: '12349995678' } });

    expect(searchInput)
  });
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(<UserProfile />);

    const searchInput = getByTestId('searchinput');
    expect(searchInput)

    fireEvent.input(searchInput, { target: { value: '1234wwwqq5678' } });
    expect(searchInput)
  });
});
