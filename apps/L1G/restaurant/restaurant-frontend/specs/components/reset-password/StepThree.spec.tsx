// import { findByText, fireEvent, render, waitFor } from '@testing-library/react';
// import { MockedProvider } from '@apollo/client/testing';
// import { ResetPasswordDocument } from '@/generated';
// import { StepThree } from '@/components/reset-password/StepThree';
// import { useRouter } from 'next/navigation';

// const ResetPasswordMock = {
//   request: {
//     query: ResetPasswordDocument,
//     variables: {
//       input: {
//         email: 'test@gmail.com',
//         newPassword: '123456',
//       },
//     },
//   },
//   result: {
//     data: {
//       ResetPassword: true,
//     },
//   },
// };

// jest.mock('next/navigation', () => ({
//   useRouter: jest.fn(),
// }));

// describe('StepThree', () => {
//   it('should render correctly', () => {
//     render(
//       <MockedProvider mocks={[ResetPasswordMock]} addTypename={false}>
//         <StepThree />
//       </MockedProvider>
//     );
//   });
//   it('should reset password', async () => {
//     const push = jest.fn();
//     (useRouter as jest.Mock).mockReturnValue({ push });
//     const localStorageMock = {
//       getItem: jest.fn().mockReturnValue('test@gmail.com'),
//       removeItem: jest.fn(),
//     };
//     Object.defineProperty(window, 'localStorage', { value: localStorageMock });

//     const { getByTestId } = render(
//       <MockedProvider mocks={[ResetPasswordMock]} addTypename={false}>
//         <StepThree />
//       </MockedProvider>
//     );

//     const password = getByTestId('password-input');
//     const confirmPassword = getByTestId('confirm-password-input');
//     const resetPasswordButton = getByTestId('reset-password-button');

//     fireEvent.change(password, { target: { value: '123456' } });
//     fireEvent.change(confirmPassword, { target: { value: '123456' } });
//     fireEvent.click(resetPasswordButton);

//     await waitFor(() => {
//       expect(localStorage.removeItem).toHaveBeenCalledWith('emailAddress');
//     });

//     await waitFor(
//       () => {
//         expect(push).toHaveBeenCalledWith('/sign-in');
//       },
//       { timeout: 3000 }
//     );
//   });
//   it('should show error message when reset password fails', async () => {
//     const push = jest.fn();
//     (useRouter as jest.Mock).mockReturnValue({ push });

//     const errorMock = {
//       request: {
//         query: ResetPasswordDocument,
//         variables: {
//           input: {
//             email: 'test@gmail.com',
//             newPassword: '123456',
//           },
//         },
//       },
//       error: new Error('Reset password failed'),
//     };

//     const localStorageMock = {
//       getItem: jest.fn().mockReturnValue('test@gmail.com'),
//     };
//     Object.defineProperty(window, 'localStorage', { value: localStorageMock });

//     const { getByTestId, findByText } = render(
//       <MockedProvider mocks={[errorMock]} addTypename={false}>
//         <StepThree />
//       </MockedProvider>
//     );

//     const password = getByTestId('password-input');
//     const confirmPassword = getByTestId('confirm-password-input');
//     const resetPasswordButton = getByTestId('reset-password-button');

//     fireEvent.change(password, { target: { value: '123456' } });
//     fireEvent.change(confirmPassword, { target: { value: '123456' } });
//     fireEvent.click(resetPasswordButton);

//     expect(await findByText('Reset password amjiltgui bolloo')).toBeInTheDocument();
//     await waitFor(() => {
//       expect(push).toHaveBeenCalledWith('/sign-in');
//     });
//   });
//   it('should handle missing email in localStorage', async () => {
//     const push = jest.fn();
//     (useRouter as jest.Mock).mockReturnValue({ push });

//     const localStorageMock = {
//       getItem: jest.fn().mockReturnValue(null),
//     };
//     Object.defineProperty(window, 'localStorage', { value: localStorageMock });

//     const { getByTestId } = render(
//       <MockedProvider mocks={[ResetPasswordMock]} addTypename={false}>
//         <StepThree />
//       </MockedProvider>
//     );

//     const password = getByTestId('password-input');
//     const confirmPassword = getByTestId('confirm-password-input');
//     const resetPasswordButton = getByTestId('reset-password-button');

//     fireEvent.change(password, { target: { value: '123456' } });
//     fireEvent.change(confirmPassword, { target: { value: '123456' } });
//     fireEvent.click(resetPasswordButton);

//     await waitFor(() => {
//       expect(push).toHaveBeenCalledWith('/sign-in');
//     });
//   });
// });
