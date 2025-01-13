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
      />
    );
    const button = getByTestId('button');
    fireEvent.click(button);
  });
});
