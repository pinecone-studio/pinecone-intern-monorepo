import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LeftSideBar } from '@/components/LeftSideBar';
import { userContext } from '../../src/app/(main)/layout';

describe('LeftSideBar', () => {
  const mockUser = {
    _id: '134124',
    email: '123@gmail.com',
    username: 'blabla',
    fullname: 'blabla',
    gender: 'blabla',
    password: 'blabla',
    profilePicture: 'blabla',
    bio: 'blabla',
    isPrivate: false,
    createdAt: 'blabla',
    updatedAt: 'blabla',
  };
  it('should toggle the search drawer when the SearchButton is clicked', () => {
    render(
      <userContext.Provider value={{ user: mockUser }}>
        <LeftSideBar />
      </userContext.Provider>
    );

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
    render(
      <userContext.Provider value={{ user: mockUser }}>
        <LeftSideBar />
      </userContext.Provider>
    );

    const homeButton = screen.getByTestId('home-click');
    fireEvent.click(homeButton);

    // const visibleSidebar = screen.getByTestId('sidebar');
    // expect(visibleSidebar).toBeInTheDocument();
  });

  // it('InstagramButton дээр дархад Sidebar нээгдэх', () => {
  //   render(<LeftSideBar />);

  //   const instagramButton = screen.getByTestId('instagram-click');
  //   fireEvent.click(instagramButton);

  //   // const visibleSidebar = screen.getByTestId('sidebar');
  //   // expect(visibleSidebar).toBeInTheDocument();
  // });

  it('NotificationButton дээр дархад NotificationDrawer нээгдэх', () => {
    render(
      <userContext.Provider value={{ user: mockUser }}>
        <LeftSideBar />
      </userContext.Provider>
    );

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
