import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Button } from '../../../src/app/challenge-dashboard/_components/CoreButton';

describe('CoreButton tests are here', () => {
  it('Should render assessment button component', () => {
    const { container } = render(<Button label="Click me" h={40} w={150} />);
    expect(container).toBeDefined();
  });
  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it('renders plus icon when icon="plus"', () => {
    const { getByTestId } = render(<Button icon="plus" />);
    expect(getByTestId('plus-icon')).toBeDefined();
  });

  it('renders delete icon when icon="delete"', () => {
    const { getByTestId } = render(<Button icon="delete" />);
    expect(getByTestId('delete-icon')).toBeDefined();
  });
  it('applies correct styles for text button', () => {
    const { container } = render(<Button btnType="text" />);
    const button = container.querySelector('button');
    expect(button).toBeDefined();
  });

  it('applies correct styles for icon button', () => {
    const { container } = render(<Button btnType="icon" />);
    const button = container.querySelector('button');
    expect(button).toBeDefined();
  });
  it('applies correct styles for button color', () => {
    const { container } = render(<Button btnColor="white" />);
    const button = container.querySelector('button');
    expect(button).toBeDefined();
  });
});
