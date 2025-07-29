// import { MockedProvider } from '@apollo/client/testing';
// import { fireEvent, render, waitFor } from '@testing-library/react';
// import { SendResetCodeDocument } from '@/generated';
// import { StepOne } from '@/components/reset-password/StepOne';

// const sendResetCodeMock = {
//   request: {
//     query: SendResetCodeDocument,
//     variables: {
//       input: {
//         email: 'test@gmail.com',
//       },
//     },
//   },
//   result: {
//     data: {
//       sendResetCode: true,
//     },
//   },
// };

// const StepTwo = ({ handleNextStep, handlePreviousStep }: { handleNextStep: () => void; handlePreviousStep: () => void }) => <div>Step Two</div>;
// jest.mock('@/components/reset-password/StepTwo', () => StepTwo);

// const StepThree = () => <div>Step Three</div>;
// jest.mock('@/components/reset-password/StepThree', () => StepThree);

// describe('StepOne', () => {
//   it('should render correctly', () => {
//     const { getByTestId } = render(
//       <MockedProvider mocks={[sendResetCodeMock]} addTypename={false}>
//         <StepOne
//           handleNextStep={() => {
//             render(
//               <MockedProvider mocks={[sendResetCodeMock]} addTypename={false}>
//                 <StepTwo
//                   handleNextStep={() => {
//                     render(
//                       <MockedProvider mocks={[sendResetCodeMock]} addTypename={false}>
//                         <StepThree />
//                       </MockedProvider>
//                     );
//                     expect(getByTestId('Step Three')).toBeInTheDocument();
//                   }}
//                   handlePreviousStep={() => {
//                     render(
//                       <MockedProvider mocks={[sendResetCodeMock]} addTypename={false}>
//                         <StepOne handleNextStep={() => null} />
//                       </MockedProvider>
//                     );
//                     expect(getByTestId('Step One')).toBeInTheDocument();
//                   }}
//                 />
//               </MockedProvider>
//             );
//           }}
//         />
//       </MockedProvider>
//     );
//   });
//   it('it should send code to email', async () => {
//     const handleNextStep = jest.fn();
//     const localStorageMock = {
//       setItem: jest.fn(),
//     };
//     Object.defineProperty(window, 'localStorage', { value: localStorageMock });

//     const { getByTestId } = render(
//       <MockedProvider mocks={[sendResetCodeMock]} addTypename={false}>
//         <StepOne handleNextStep={handleNextStep} />
//       </MockedProvider>
//     );

//     const emailInput = getByTestId('email-input-resetpassword');
//     const submitButton = getByTestId('send-code-button');

//     fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(localStorage.setItem).toHaveBeenCalledWith('emailAddress', 'test@gmail.com');
//     });

//     await waitFor(() => {
//       expect(handleNextStep).toHaveBeenCalled();
//     });
//   });

//   it('it should throw a error when email is not found', async () => {
//     const handleNextStep = jest.fn();

//     const emailNotFoundMock = {
//       request: {
//         query: SendResetCodeDocument,
//         variables: {
//           input: {
//             email: 'notfound@gmail.com',
//           },
//         },
//       },
//       error: new Error('User not found'),
//     };

//     const { getByTestId, findByText } = render(
//       <MockedProvider mocks={[emailNotFoundMock]} addTypename={false}>
//         <StepOne handleNextStep={handleNextStep} />
//       </MockedProvider>
//     );

//     const emailInput = getByTestId('email-input-resetpassword');
//     const submitButton = getByTestId('send-code-button');

//     fireEvent.change(emailInput, { target: { value: 'notfound@gmail.com' } });
//     fireEvent.click(submitButton);

//     expect(handleNextStep).not.toHaveBeenCalled();

//     expect(await findByText('Имайл хаяг олдсонгүй')).toBeInTheDocument();
//   });

//   it('it should throw a error when network error', async () => {
//     const handleNextStep = jest.fn();

//     const networkErrorMock = {
//       request: {
//         query: SendResetCodeDocument,
//         variables: {
//           input: {
//             email: 'test@gmail.com',
//           },
//         },
//       },
//       error: new Error('Network error'),
//     };

//     const { getByTestId, findByText } = render(
//       <MockedProvider mocks={[networkErrorMock]} addTypename={false}>
//         <StepOne handleNextStep={handleNextStep} />
//       </MockedProvider>
//     );

//     const emailInput = getByTestId('email-input-resetpassword');
//     const submitButton = getByTestId('send-code-button');

//     fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
//     fireEvent.click(submitButton);

//     expect(handleNextStep).not.toHaveBeenCalled();

//     expect(await findByText('Хүсэлт явуулахад алдаа гарлаа')).toBeInTheDocument();
//   });
// });
