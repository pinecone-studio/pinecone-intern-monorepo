import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomButton from '../../../src/app/articles/_components/create-article/CustomButton';

describe('Button Component', () => {
  it('1. Renders the button with label', () => {
    const { getByText } = render(<CustomButton label="Нийтлэх" />);
    expect(getByText('Нийтлэх')).toBeDefined();
  });

  it('2. Calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<CustomButton label="Нийтлэх" onClick={handleClick} />);
    fireEvent.click(getByText('Нийтлэх'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('3. Is disabled when disabled prop is true', () => {
    const { getByText } = render(<CustomButton label="Нийтлэх" disabled />);
    const button = getByText('Нийтлэх');
    expect(button.getAttribute('disabled')).toEqual('');
  });

  it('4. Renders the button as bgColor  ', () => {
    const { getByText } = render(<CustomButton label="Нийтлэх" bgColor="primary" />);
    const button = getByText('Нийтлэх');
    expect(button).not.toBeNull();
    expect(button).toHaveClass('btn bg-[#1c2024] text-white');
  });

  it('4. Renders the button as bgColor no p  ', () => {
    const { getByText } = render(<CustomButton label="Нийтлэх"  bgColor="secondary"/>);
    const button = getByText('Нийтлэх');
    expect(button).not.toBeNull();
    expect(button).toHaveClass('btn border-[#D6D8DB]  bg-[#D6D8DB] btn-outline text-[#121316] hover:bg-slate-300 hover:border-[#D6D8DB]');
  });
});
