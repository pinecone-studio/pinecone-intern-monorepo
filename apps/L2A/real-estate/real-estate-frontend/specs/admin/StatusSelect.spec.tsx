/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusSelect from '@/app/admin/_components/StatusSelect';
import { useUpdatePostByIdMutation } from '@/generated';

jest.mock('@/generated', () => ({
  useUpdatePostByIdMutation: jest.fn(),
}));

const mockUpdatePostStatus = jest.fn();

jest.useFakeTimers();

describe('StatusSelect Component', () => {
  beforeEach(() => {
    (useUpdatePostByIdMutation as jest.Mock).mockReturnValue([mockUpdatePostStatus, { loading: false }]);
    mockUpdatePostStatus.mockClear();
  });

  it('renders with initial value', () => {
    render(<StatusSelect value="Хүлээгдэж буй" onChange={jest.fn()} id="1" />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('Хүлээгдэж буй');
  });

  it('calls onChange when a new status is selected', () => {
    const handleChange = jest.fn();
    render(<StatusSelect value="Хүлээгдэж буй" onChange={handleChange} id="1" />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Зөвшөөрөх' } });
    expect(handleChange).toHaveBeenCalledWith('Зөвшөөрөх');
  });

  it('calls updatePostStatus mutation when status is changed', async () => {
    render(<StatusSelect value="Хүлээгдэж буй" onChange={() => {}} id="1" post={{
      description: 'test desc',
      price: 1000,
      propertyOwnerId: 'owner-1',
      title: 'Test title'
    }} />);
    
    const select = screen.getByRole('combobox');
    await act(async () => {
      fireEvent.change(select, { target: { value: 'Зөвшөөрөх' } });
    });

expect(mockUpdatePostStatus).toHaveBeenCalledWith({
  variables: {
    id: '1',
    input: {
      status: 'APPROVED',
      propertyOwnerId: 'owner-1',
    },
  },
});
  });

  it('does not call onChange when same status is selected', () => {
    const handleChange = jest.fn();
    render(<StatusSelect value="Зөвшөөрөх" onChange={handleChange} id="1" />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Зөвшөөрөх' } });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('shows success message when value changes', () => {
    const { rerender } = render(<StatusSelect value="Хүлээгдэж буй" onChange={jest.fn()} id="1" />);
    rerender(<StatusSelect value="Зөвшөөрөх" onChange={jest.fn()} id="1" />);
    expect(screen.getByText('Төлөв амжилттай солигдлоо')).toBeInTheDocument();
    expect(screen.getByText('Thank you for your review!')).toBeInTheDocument();
  });

  it('removes success message after 3 seconds', () => {
    const { rerender } = render(<StatusSelect value="Хүлээгдэж буй" onChange={jest.fn()} id="1" />);
    rerender(<StatusSelect value="Зөвшөөрөх" onChange={jest.fn()} id="1" />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Төлөв амжилттай солигдлоо')).not.toBeInTheDocument();
  });

  it('logs error if updatePostStatus fails', async () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  (useUpdatePostByIdMutation as jest.Mock).mockReturnValue([
    jest.fn(() => Promise.reject('mock-error')),
    { loading: false },
  ]);

  render(
    <StatusSelect
      value="Хүлээгдэж буй"
      onChange={() => {}}
      id="1"
      post={{
        description: 'desc',
        price: 100,
        propertyOwnerId: 'owner-id',
        title: 'Title',
      }}
    />
  );

  const select = screen.getByRole('combobox');

  await act(async () => {
    fireEvent.change(select, { target: { value: 'Зөвшөөрөх' } });
  });

  expect(consoleSpy).toHaveBeenCalledWith('Status update error:', 'mock-error');

  consoleSpy.mockRestore();
});
});
