import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TrashIcon from '@/components/myEstate/TrashIcon';

describe('TrashIcon', () => {
  it('renders the trash icon', () => {
    const { container } = render(<TrashIcon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
