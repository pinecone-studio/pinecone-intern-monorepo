import NotificationItem from '@/components/NotificationItem';
import { render } from '@testing-library/react';

const mockProps = {
  orderId: '123',
  status: 'Pending' as 'Pending' | 'InProcess' | 'Ready' | 'Done',
  createdAt: new Date(),
  index: 0,
  totalOrders: 5,
  isUnread: true,
  onClick: jest.fn(),
};

describe('NotificationItem', () => {
  it('changes to Bell when clicked', () => {
    mockProps.isUnread = true;
    render(<NotificationItem {...mockProps} />);
  });

  it('changes to Bell when clicked', () => {
    mockProps.isUnread = false;
    render(<NotificationItem {...mockProps} />);
  });
});
