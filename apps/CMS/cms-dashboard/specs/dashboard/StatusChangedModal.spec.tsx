import { render } from '@testing-library/react';
import { StatusChangedModal } from '@/app/dashboard/_components/StatusChangedModal';

describe('StatusChangedModal', () => {
  it('renders correctly with given props', () => {
    const { container } = render(<StatusChangedModal message={'test'} />);

    expect(container).toBeDefined();
  });
});
