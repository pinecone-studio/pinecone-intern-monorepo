import { Login } from '@/components/Login';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Login', () => {
  it('renders the component', async () => {
    const { getByTestId } = render(
      <Login
        emailSubmit={(e) => {
          console.log(e);
        }}
        emailHnalder={(e) => {
          console.log(e);
        }}
        error="Invalid email"
      />
    );
    const button = getByTestId('button');
    fireEvent.click(button);
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'test' } });
  });
});
