import { CreateTableModal } from '@/app/(admin)/table/components/CreateTableModal';
import { render, screen } from '@testing-library/react';

describe('CreateTableModal', () => {
  it('renders the TableForm with the form content', () => {
    render(<CreateTableModal />);

    const trigger = screen.getByText(/ширээ/i);
    trigger.click();

    const form = screen.getByTestId('table-form');
    expect(form).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Ширээний нэр')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Үүсгэх' })).toBeInTheDocument();
  });
});
