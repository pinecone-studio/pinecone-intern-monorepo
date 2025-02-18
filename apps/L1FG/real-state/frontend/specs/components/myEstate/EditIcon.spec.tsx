import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditIcon from '@/components/myEstate/EditIcon';

describe('EditIcon', () => {
  it('renders the edit icon', () => {
    const { container } = render(<EditIcon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
