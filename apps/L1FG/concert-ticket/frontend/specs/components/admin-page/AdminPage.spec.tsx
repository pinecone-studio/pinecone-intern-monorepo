import { render, screen, fireEvent } from '@testing-library/react';
import { AdminPage } from '../../../src/components/pages/admin-page';
import '@testing-library/jest-dom';
import { ConcertFormProvider } from '../../../src/components/admincontext/DialogContext';

jest.mock('@/components/adminfeature/AdminDialog', () => ({
  AdminDialog: jest.fn(() => <div data-testid="mock-admin-dialog">Admin Dialog</div>),
}));

jest.mock('@/components/adminHero/AdminHero', () => ({
  AdminTable: jest.fn(() => <div data-testid="mock-admin-table">Admin Table</div>),
}));

jest.mock('@/components/header/AdminHeader', () => ({
  AdminHeader: jest.fn(() => <div data-testid="mock-admin-header">Admin Header</div>),
}));

jest.mock('../../../src/components/admincontext/DialogContext', () => ({
  ConcertFormProvider: jest.fn(({ children, onSubmit }) => (
    <div data-testid="mock-concert-form-provider" onClick={() => onSubmit(mockFormData)}>
      {children}
    </div>
  )),
}));

const mockFormData = {
  concertname: 'Test Concert',
  concertPhoto: 'test.jpg',
  concertDescription: 'Test Description',
  artistName: ['Test Artist'],
  dates: [new Date()],
  time: '20:00',
  vipticketquantity: '100',
  vipticketprice: '200',
  regularticketquantity: '300',
  regularticketprice: '150',
  openfieldticketquantity: '500',
  openfieldticketprice: '100',
};

describe('AdminPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all components correctly', () => {
    render(<AdminPage />);

    expect(screen.getByTestId('mock-admin-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-admin-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('mock-admin-table')).toBeInTheDocument();
    expect(screen.getByTestId('mock-concert-form-provider')).toBeInTheDocument();
  });

  test('renders text content correctly', () => {
    render(<AdminPage />);

    expect(screen.getByText('Тасалбар')).toBeInTheDocument();
    expect(screen.getByText('Идэвхтэй зарагдаж буй тасалбарууд')).toBeInTheDocument();
  });

  test('handles form submission correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    render(<AdminPage />);

    fireEvent.click(screen.getByTestId('mock-concert-form-provider'));

    expect(consoleSpy).toHaveBeenCalledWith(mockFormData);

    consoleSpy.mockRestore();
  });

  test('applies correct styling', () => {
    render(<AdminPage />);

    const outerContainer = screen.getByText('Тасалбар').closest('#outerContainer');
    expect(outerContainer).toHaveClass('container', 'w-[1200px]', 'h-[1041px]');

    const pageWrapper = screen.getByText('Тасалбар').closest('#pageWrapper');
    expect(pageWrapper).toHaveClass('flex', 'items-center', 'justify-center', 'mt-8', 'bg-[#F4F4F5]');
  });

  test('ConcertFormProvider receives correct props', () => {
    render(<AdminPage />);

    expect(ConcertFormProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        onSubmit: expect.any(Function),
        children: expect.anything(),
      }),
      expect.anything()
    );
  });
});
