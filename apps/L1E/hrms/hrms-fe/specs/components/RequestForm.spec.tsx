import { fireEvent, render } from '@testing-library/react';
import RequestForm from '@/components/RequestForm';

jest.mock('../../src/components/requestForm/RequestFormcom', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Day Component</div>),
}));

jest.mock('../../src/components/requestForm/RequestFormPaid', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Time Component</div>),
}));

jest.mock('../../src/components/requestForm/RequestFormRemote', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Time Component</div>),
}));

describe('RequestForm', () => {
  it('should RequestForm', async () => {
  const {getByTestId}=render(<RequestForm />);

  const select = getByTestId('select-input');
  fireEvent.keyDown(select, { key: 'ArrowDown' });

  const input1 = getByTestId('item1');
  fireEvent.keyDown(input1, { key: 'Enter'});
  });
it('should RequestForm', async () => {
  const { getByTestId } = render(<RequestForm />)

  const select = getByTestId('select-input');
  fireEvent.keyDown(select, { key: 'ArrowDown' })

  const input2 = getByTestId('item2');
  fireEvent.keyDown(input2, { key: 'Enter' });
});

it('should RequestForm', async () => {
  const { getByTestId } = render(<RequestForm />);

  const select = getByTestId('select-input');
  fireEvent.keyDown(select, { key: 'ArrowDown' });

  const input2 = getByTestId('item3');
  fireEvent.keyDown(input2, { key: 'Enter' });
});


});
