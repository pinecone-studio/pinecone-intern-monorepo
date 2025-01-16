import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OtpGenerate } from '@/components/OtpGenerate';
global.ResizeObserver = class {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
};
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
};
module.exports = {
  testEnvironment: 'jsdom',
};

describe('OtpGenerate', () => {
  it('renders the component', async () => {
    const { getByTestId } = render(
      <OtpGenerate
        handleChange={(e) => {
          console.log(e);
        }}
        handlesubmit={() => {
          console.log('a');
        }}
        resent={() => console.log('1')}
        errorotp=""
      />
    );
    const button = getByTestId('button');
    fireEvent.click(button);
    const input1 = getByTestId('enter-input');
    fireEvent.change(input1, { target: { value: '1111' } });
  });
  it('renders the component', async () => {
    const { getByTestId } = render(
      <OtpGenerate
        handleChange={(e) => {
          console.log(e);
        }}
        handlesubmit={() => {
          console.log('a');
        }}
        resent={() => console.log('1')}
        errorotp="invaled otp"
      />
    );
    const button = getByTestId('button');
    fireEvent.click(button);
    const input1 = getByTestId('enter-input');
    fireEvent.change(input1, { target: { value: '1111' } });
  });
});
