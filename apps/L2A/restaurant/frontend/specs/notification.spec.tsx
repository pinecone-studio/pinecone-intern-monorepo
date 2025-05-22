import { render, screen } from '@testing-library/react';
import { Notification } from '@/app/_features/Notification';
import '@testing-library/jest-dom';

describe('Notification Component', () => {
  it('renders notification container', () => {
    render(<Notification />);
    const container = screen.getByTestId('notification-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the header', () => {
    render(<Notification />);
    const header = screen.getByTestId('notification-header');
    expect(header).toHaveTextContent('Мэдэгдэл');
  });

  it('renders the correct number of notifications', () => {
    render(<Notification />);
    const notificationList = screen.getByTestId('notification-list');
    expect(notificationList.children).toHaveLength(3);  
  });

  it('renders notification content correctly', () => {
    render(<Notification />);
    const notification1 = screen.getByTestId('notification-#32193');
    expect(notification1).toBeInTheDocument();
    expect(screen.getByTestId('notification-id-#32193')).toHaveTextContent('#32193');
    expect(screen.getByTestId('notification-message-#32193')).toHaveTextContent('Таны захиалсан хоол бэлтгэгдлээ.');
    expect(screen.getByTestId('notification-status-#32193')).toHaveTextContent('Хүлээгдэж буй');
    expect(screen.getByTestId('notification-date-#32193')).toHaveTextContent('24.10.19 15:25');
  });

  it('renders icon for each notification', () => {
    render(<Notification />);
    const icon = screen.getByTestId('notification-icon-#32193');
    expect(icon).toBeInTheDocument();
  });

  it('renders status correctly', () => {
    render(<Notification />);
    const status = screen.getByTestId('notification-status-#32194');
    expect(status).toHaveTextContent('Бэлэн');
  });

  it('renders date correctly', () => {
    render(<Notification />);
    const date = screen.getByTestId('notification-date-#32194');
    expect(date).toHaveTextContent('24.10.19 16:00');
  });
});
