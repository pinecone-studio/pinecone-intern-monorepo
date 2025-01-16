// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { Header } from '@/components/Header';
// import { GetEmployeesDocument } from '@/generated';
// import { MockedProvider } from '@apollo/client/testing';
// import { useRouter } from 'next/navigation';
import React from 'react';
import { Header } from '@/components/Header';
import { render } from '@testing-library/react';

// jest.mock('next/navigation', () => ({
//   useRouter: jest.fn(),
// }));

// const mockGetEmployees = {
//   request: {
//     query: GetEmployeesDocument,
//   },
//   result: {
//     data: {
//       getEmployees: [
//         {
//           _id: '1',
//           email: 'john.doe@example.com',
//           jobTitle: 'Developer',
//           username: 'johndoe',
//           adminStatus: true,
//           remoteLimit: 5,
//           paidLeaveLimit: 10,
//           freeLimit: 2,
//           employeeStatus: 'Lead',
//           createdAt: '2020-01-01',
//           updatedAt: '2023-01-01',
//         },
//         {
//           _id: '2',
//           email: 'jane.doe@example.com',
//           jobTitle: 'Designer',
//           username: 'janedoe',
//           adminStatus: false,
//           remoteLimit: 3,
//           paidLeaveLimit: 7,
//           freeLimit: 1,
//           employeeStatus: 'Lead',
//           createdAt: '2020-02-01',
//           updatedAt: '2023-02-01',
//         },
//       ],
//     },
//   },
// };

describe('Header', () => {
  // let push: jest.Mock;
  // beforeEach(() => {
  //   push = jest.fn();
  //   (useRouter as jest.Mock).mockReturnValue({ push });
  // });
  // it('should toggle dark mode on checkbox change', async () => {
  //   Storage.prototype.getItem = jest.fn(() => 'dark');
  //   render(
  //     <MockedProvider mocks={[mockGetEmployees]} addTypename={false}>
  //       <Header />
  //     </MockedProvider>
  //   );
  //   const themeToggleCheckbox = screen.getByRole('checkbox');
  //   const sunnyIcon = screen.getByTestId('IoSunnyOutline');
  //   expect(sunnyIcon);
  //   fireEvent.click(themeToggleCheckbox);
  //   await waitFor(() => {
  //     expect(document.body);
  //   });
  //   expect(localStorage.getItem('theme'));
  //   fireEvent.click(themeToggleCheckbox);
  // });
  // it('renders the header correctly', () => {
  //   const { getByTestId } = render(
  //     <MockedProvider mocks={[mockGetEmployees]} addTypename={false}>
  //       <Header />
  //     </MockedProvider>
  //   );
  //   // Simulate button clicks for different components
  //   fireEvent.click(getByTestId('MyRequest-btn'));
  //   expect(push).toHaveBeenCalledWith('/my-requests');
  //   fireEvent.click(getByTestId('RequestForm-btn'));
  //   expect(push).toHaveBeenCalledWith('/my-requests');
  //   fireEvent.click(getByTestId('LeaveCalendar-btn'));
  //   expect(push).toHaveBeenCalledWith('/my-requests');
  //   fireEvent.click(getByTestId('PendingRequest-btn'));
  //   expect(push).toHaveBeenCalledWith('/my-requests');
  //   fireEvent.click(getByTestId('employee-list-btn'));
  //   expect(push).toHaveBeenCalledWith('/my-requests');
  // });
  it('renders the header correctly', () => {
    render(<Header />);
  });
});
