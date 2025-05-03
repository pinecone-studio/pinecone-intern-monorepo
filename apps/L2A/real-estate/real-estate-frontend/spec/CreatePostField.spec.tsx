import { CreatePostField } from '@/app/create-post/_components/CreatePostField';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useForm } from 'react-hook-form';

type TestWrapperProps = {
  error?: any;
  trigger?: (_name?: string) => Promise<boolean> | undefined;
}

const TestWrapper = ({ error, trigger }: TestWrapperProps) => {
  const { register } = useForm();

  return <CreatePostField register={register} error={error} name="area" trigger={trigger} />;
}

describe('CreatePostField Component', () => {
  it('should render the input field', () => {
    render(<TestWrapper />);
    const input = screen.getByTestId('field');
    expect(input).toBeInTheDocument();
  });

  it('should trigger validation on blur', () => {
    const triggerMock = jest.fn();
    
    render(<TestWrapper trigger={triggerMock} />);
    const input = screen.getByTestId('field');
    fireEvent.blur(input);
    expect(triggerMock).toHaveBeenCalledWith('area');
  });

  it('should show error message when error is passed', () => {
    const error = { message: 'Талбайн утгыг заавал оруулна уу' };
    render(<TestWrapper error={error} />);
    expect(screen.getByText('Талбайн утгыг заавал оруулна уу')).toBeInTheDocument();
  });
});
