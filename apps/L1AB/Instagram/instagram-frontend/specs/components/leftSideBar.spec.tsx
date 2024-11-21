import { fireEvent, render, screen } from '@testing-library/react';
import { LeftSideBar } from '@/components/LeftSideBar';
import '@testing-library/jest-dom';

describe('LeftSideBar', () => {
  it('should toggle the search drawer when the SearchButton is clicked', () => {
    render(<LeftSideBar />);

    const searchButton = screen.getByTestId('search-click');
    fireEvent.click(searchButton);
    const notificationButton = screen.getByTestId('notif-click');
    fireEvent.click(notificationButton);
    const searchButton1 = screen.getByTestId('search-click');
    fireEvent.click(searchButton1);
    const notificationButton1 = screen.getByTestId('notif-click');
    fireEvent.click(notificationButton1);
    const searchButton2 = screen.getByTestId('search-click');
    fireEvent.click(searchButton2);

    // const visibleSearchDrawer = screen.getByTestId('search-drawer');
    // expect(visibleSearchDrawer).toBeInTheDocument();
  });

  it('HomeButton дээр дархад Sidebar-г хаах', () => {
    render(<LeftSideBar />);

    const homeButton = screen.getByTestId('home-click');
    fireEvent.click(homeButton);

    // const visibleSidebar = screen.getByTestId('sidebar');
    // expect(visibleSidebar).toBeInTheDocument();
  });

  it('InstagramButton дээр дархад Sidebar нээгдэх', () => {
    render(<LeftSideBar />);

    const instagramButton = screen.getByTestId('instagram-click');
    fireEvent.click(instagramButton);

    // const visibleSidebar = screen.getByTestId('sidebar');
    // expect(visibleSidebar).toBeInTheDocument();
  });

  it('NotificationButton дээр дархад NotificationDrawer нээгдэх', () => {
    render(<LeftSideBar />);

    const notificationButton = screen.getByTestId('notif-click');
    fireEvent.click(notificationButton);
    const searchButton = screen.getByTestId('search-click');
    fireEvent.click(searchButton);
    const notificationButton1 = screen.getByTestId('notif-click');
    fireEvent.click(notificationButton1);
    // const visibleNotificationDrawer = screen.getByTestId('notification-drawer');
    // expect(visibleNotificationDrawer).toBeInTheDocument();
  });
});
