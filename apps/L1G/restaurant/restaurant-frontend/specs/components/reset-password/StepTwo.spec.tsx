// import { StepTwo } from '@/components/reset-password/StepTwo';
// import { MockedProvider } from '@apollo/client/testing';
// import { VerifyResetCodeDocument } from '@/generated';
// import { act, fireEvent, render, waitFor } from '@testing-library/react';

// const verifyResetCodeMock = {
//   request: {
//     query: VerifyResetCodeDocument,
//     variables: {
//       input: {
//         code: '1234',
//         email: 'test@gmail.com',
//       },
//     },
//   },
//   result: {
//     data: {
//       verifyResetCode: true,
//     },
//   },
// };

// const localStorageMock = {
//   getItem: (key: string) => {
//     if (key === 'emailAddress') {
//       return 'test@gmail.com';
//     }
//     return null;
//   },
// };
// Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// class ResizeObserver {
//   observe() {
//     //mock
//   }
//   unobserve() {
//     //mock
//   }
//   disconnect() {
//     //mock
//   }
// }

// window.ResizeObserver = ResizeObserver;

// declare global {
//   interface Window {
//     ResizeObserver: typeof ResizeObserver;
//   }
// }

// const StepOne = ({ handleNextStep }: { handleNextStep: () => void }) => <div>Step One</div>;
// jest.mock('@/components/reset-password/StepOne', () => StepOne);

// const StepThree = () => <div>Step Three</div>;
// jest.mock('@/components/reset-password/StepThree', () => StepThree);

// describe('StepTwo', () => {
//   it('should render correctly', () => {
//     const { getByTestId } = render(
//       <MockedProvider mocks={[verifyResetCodeMock]} addTypename={false}>
//         <StepTwo
//           handleNextStep={() => {
//             render(
//               <MockedProvider mocks={[verifyResetCodeMock]} addTypename={false}>
//                 <StepThree />
//               </MockedProvider>
//             );
//             expect(getByTestId('Step Three')).toBeInTheDocument();
//           }}
//           handlePreviousStep={() => {
//             render(
//               <MockedProvider mocks={[verifyResetCodeMock]} addTypename={false}>
//                 <StepOne handleNextStep={() => null} />
//               </MockedProvider>
//             );
//             expect(getByTestId('Step One')).toBeInTheDocument();
//           }}
//         />
//       </MockedProvider>
//     );
//   });
//   it('should verify the code', async () => {
//     const handleNextStep = jest.fn();

//     const { container } = render(
//       <MockedProvider mocks={[verifyResetCodeMock]} addTypename={false}>
//         <StepTwo handleNextStep={handleNextStep} handlePreviousStep={jest.fn()} />
//       </MockedProvider>
//     );

//     const otpInputs = container.querySelectorAll('input');
//     otpInputs.forEach((input, index) => {
//       fireEvent.change(input, { target: { value: (index + 1).toString() } });
//     });

//     console.log(otpInputs);

//     const form = container.querySelector('form');
//     if (form) {
//       await act(async () => {
//         fireEvent.submit(form);
//       });
//     }

//     await waitFor(() => {
//       expect(handleNextStep).toHaveBeenCalled();
//     });
//   });
// });
