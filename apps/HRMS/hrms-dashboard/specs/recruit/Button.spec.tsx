import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../../src/app/recruiting/_components';

describe('Button Component', () => {
  it('1. Renders the button with label', () => {
    const { getByText } = render(<Button label="Дэлгэрэнгүй" />);
    expect(getByText('Дэлгэрэнгүй')).toBeDefined();
  });

  it('2. Calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button label="Дэлгэрэнгүй" onClick={handleClick} />);
    fireEvent.click(getByText('Дэлгэрэнгүй'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('3. Is disabled when disabled prop is true', () => {
    const { getByText } = render(<Button label="Дэлгэрэнгүй" disabled />);
    const button = getByText('Дэлгэрэнгүй');
    expect(button.getAttribute('disabled')).toEqual('');
  });

  it('4. Renders the button as outlined', () => {
    const { getByText } = render(<Button label="Дэлгэрэнгүй" btnType="outlined" />);
    const button = getByText('Дэлгэрэнгүй');
    const computedStyles = window.getComputedStyle(button);
    expect(computedStyles.border).toEqual('1px solid');
  });

  it('5. Renders icon when plusIcon prop is true', () => {
    const { getByText } = render(<Button label="Дэлгэрэнгүй" plusIcon={true} />);
    const button = getByText('Дэлгэрэнгүй');
    const svgIcon = button.querySelector('svg');
    expect(svgIcon).not.toBeNull();
  });

  it('6. Does not render icon when plusIcon prop is false', () => {
    const { getByText } = render(<Button label="Дэлгэрэнгүй" plusIcon={false} />);
    const button = getByText('Дэлгэрэнгүй');
    const svgIcon = button.querySelector('svg');
    expect(svgIcon).toBeNull();
  });
});
