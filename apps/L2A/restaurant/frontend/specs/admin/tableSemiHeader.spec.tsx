import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TableSemiHeader from '@/app/admin/table/_features/AdminTableSemiHeader';
import '@testing-library/jest-dom';

describe('TableSemiHeader', () => {
  let alertMock: jest.SpyInstance;

  beforeEach(() => {
    alertMock = jest.spyOn(window, 'alert').mockImplementation(jest.fn());
    render(<TableSemiHeader />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const openDialog = () => fireEvent.click(screen.getByTestId('add-table-button'));

  it('renders header title', () => {
    expect(screen.getByTestId('header-title')).toHaveTextContent('Ширээ');
  });

  it('opens dialog when clicking add table button', () => {
    openDialog();
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
  });

  it('alerts when clicking create without input', async () => {
    openDialog();
    fireEvent.click(screen.getByTestId('create-button'));
    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Ширээний нэр хоосон байна'));
  });

  it('does not alert when input is filled', async () => {
    openDialog();
    fireEvent.change(screen.getByTestId('table-name-input'), {
      target: { value: 'Table 1' },
    });
    fireEvent.click(screen.getByTestId('create-button'));
    await waitFor(() => {
      expect(alertMock).not.toHaveBeenCalled();
    });
  });
});
