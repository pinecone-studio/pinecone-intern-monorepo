import { render } from '@testing-library/react';
import { StatusChangedModal } from '@/app/dashboard/_components/StatusChangedModal';

jest.mock('../../src/assets/icons/SuccessIcon', () => ({
  SuccessIcon: () => <span data-testid="success-icon">SuccessIcon</span>,
}));

describe('StatusChangedModal', () => {
  it('renders correctly with given props', () => {
    const title = 'Test Title';
    const status = 'Completed';

    const { container } = render(<StatusChangedModal title={title} status={status} />);

    expect(container).toBeDefined();
  });
});
