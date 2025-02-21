/*eslint-disable*/
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { FormSection } from '@/components/adminfeature/FormSection';
import { useConcertForm } from '@/components/admincontext/DialogContext';

jest.mock('@/components/ui/label', () => ({
  Label: ({ children, htmlFor }: any) => (
    <label data-testid="label" htmlFor={htmlFor}>
      {children}
    </label>
  ),
}));
jest.mock('@/components/ui/input', () => ({
  Input: ({ id, name, value, onChange, className, placeholder, type = 'text', 'data-testid': dataTestId }: any) => (
    <input data-testid={dataTestId || 'input'} id={id} name={name} value={value} onChange={onChange} className={className} placeholder={placeholder} type={type} />
  ),
}));
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, type }: any) => (
    <button data-testid="button" onClick={onClick} className={className} type={type}>
      {children}
    </button>
  ),
}));
jest.mock('@/app/_features/adminFeature/ImageUrlPreview', () => ({
  __esModule: true,
  default: ({ onChange, name, value }: any) => (
    <div data-testid="image-upload">
      <input
        type="file"
        data-testid="image-input"
        value={value || ''}
        onChange={(e) => {
          const file = e.target.files?.[0];
          onChange({
            target: {
              name,
              value: file ? file.name : '',
            },
          });
        }}
      />
      {value && <img src={value} alt="preview" data-testid="image-preview" />}
    </div>
  ),
}));
jest.mock('@/components/adminfeature/RangeDatePicker', () => ({
  DatePicker: ({ selectedDates, onDatesSelect }: any) => (
    <div data-testid="date-picker">
      <input type="date" value={selectedDates[0]} onChange={(e) => onDatesSelect([e.target.value])} />
    </div>
  ),
}));
jest.mock('@/components/adminfeature/TimeSelector', () => ({
  TimeSelector: ({ value, onChange }: any) => (
    <div data-testid="time-selector">
      <input type="time" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
}));
jest.mock('@/components/admincontext/DialogContext', () => ({
  useConcertForm: jest.fn(),
}));

describe('FormSection', () => {
  const mockHandleChange = jest.fn();
  const mockHandleArtistChange = jest.fn();
  const mockAddArtist = jest.fn();
  const mockRemoveArtist = jest.fn();
  const mockHandleDatesSelect = jest.fn();
  const defaultFormData = {
    concertName: '',
    concertPhoto: '',
    concertPlan: '',
    artistName: [''],
    concertDay: '',
    concertTime: '',
    vipTicket: { quantity: '', price: '' },
    regularTicket: { quantity: '', price: '' },
    standingAreaTicket: { quantity: '', price: '' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useConcertForm as jest.Mock).mockReturnValue({
      handleChange: mockHandleChange,
      handleArtistChange: mockHandleArtistChange,
      addArtist: mockAddArtist,
      removeArtist: mockRemoveArtist,
      handleDatesSelect: mockHandleDatesSelect,
    });
  });
  it('renders all form fields correctly', () => {
    render(<FormSection formData={defaultFormData} errors={{}} />);

    expect(screen.getByPlaceholderText('Нэр оруулах')).toBeInTheDocument();
    expect(screen.getByTestId('image-upload')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Дэлгэрэнгүй мэдээлэл')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Артистын нэр')).toBeInTheDocument();
    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
    expect(screen.getByTestId('time-selector')).toBeInTheDocument();
    expect(screen.getByTestId('vipticketquantity')).toBeInTheDocument();
    expect(screen.getByTestId('regularticketquantity')).toBeInTheDocument();
    expect(screen.getByTestId('openfieldticketquantity')).toBeInTheDocument();
  });

  it('handles artist name changes', async () => {
    render(<FormSection formData={defaultFormData} errors={{}} />);

    const artistInput = screen.getByPlaceholderText('Артистын нэр');

    fireEvent.change(artistInput, { target: { value: 'Test Artist' } });

    expect(mockHandleArtistChange).toHaveBeenCalledWith(0, 'Test Artist');
  });

  it('handles adding and removing artists', async () => {
    const formDataWithArtists = {
      ...defaultFormData,
      artistName: ['Artist 1', 'Artist 2'],
    };

    render(<FormSection formData={formDataWithArtists} errors={{}} />);

    const addButton = screen.getByText('Бусад артист нэмэх +');
    await userEvent.click(addButton);
    expect(mockAddArtist).toHaveBeenCalled();

    const removeButtons = screen.getAllByText('×');
    await userEvent.click(removeButtons[0]);
    expect(mockRemoveArtist).toHaveBeenCalledWith(1);
  });

  it('displays error messages when present', () => {
    const errors = {
      concertName: 'Concert name is required',
      'vipTicket.quantity': 'Quantity is required',
      'vipTicket.price': 'Price is required',
      concertDay: 'Concert date is required',
      concertTime: 'Concert time is required',
    };

    render(<FormSection formData={defaultFormData} errors={errors} />);

    expect(screen.getByText('Concert name is required')).toBeInTheDocument();
    expect(screen.getByText('Quantity is required')).toBeInTheDocument();
    expect(screen.getByText('Price is required')).toBeInTheDocument();
    expect(screen.getByText('Concert date is required')).toBeInTheDocument();
    expect(screen.getByText('Concert time is required')).toBeInTheDocument();
  });

  it('handles ticket section input changes', async () => {
    render(<FormSection formData={defaultFormData} errors={{}} />);

    const vipQuantityInput = screen.getByTestId('vipticketquantity');
    const vipPriceInput = screen.getByTestId('vipticketprice');

    await userEvent.type(vipQuantityInput, '100');
    await userEvent.type(vipPriceInput, '1000');

    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('handles date and time selection', async () => {
    render(<FormSection formData={defaultFormData} errors={{}} />);

    const datePicker = screen.getByTestId('date-picker').querySelector('input');
    const timePicker = screen.getByTestId('time-selector').querySelector('input');

    if (datePicker && timePicker) {
      await userEvent.type(datePicker, '2024-02-18');
      await userEvent.type(timePicker, '14:30');

      expect(mockHandleDatesSelect).toHaveBeenCalled();
      expect(mockHandleChange).toHaveBeenCalled();
    }
  });

  describe('Image Upload Section', () => {
    it('handles image upload correctly', async () => {
      render(<FormSection formData={defaultFormData} errors={{}} />);

      const imageInput = screen.getByTestId('image-input');
      const file = new File(['test'], 'test.png', { type: 'image/png' });

      await userEvent.upload(imageInput, file);

      expect(mockHandleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            name: 'concertPhoto',
            value: 'test.png',
          },
        })
      );
    });

    it('displays error message when image upload has error', () => {
      const errors = {
        concertPhoto: 'Image is required',
      };

      render(<FormSection formData={defaultFormData} errors={errors} />);

      expect(screen.getByText('Image is required')).toBeInTheDocument();
    });
  });

  it('applies error styling to first artist input when there is an error', () => {
    const errors = {
      artistName: 'Artist name is required',
    };

    render(<FormSection formData={defaultFormData} errors={errors} />);

    const firstArtistInput = screen.getByPlaceholderText('Артистын нэр');
    expect(firstArtistInput).toHaveClass('border-red-500');

    expect(screen.getByText('Artist name is required')).toBeInTheDocument();
  });

  it('does not apply error styling to additional artist inputs', () => {
    const errors = {
      artistName: 'Artist name is required',
    };

    const formDataWithMultipleArtists = {
      ...defaultFormData,
      artistName: ['', 'Second Artist'],
    };

    render(<FormSection formData={formDataWithMultipleArtists} errors={errors} />);

    const artistInputs = screen.getAllByPlaceholderText('Артистын нэр');
    expect(artistInputs[0]).toHaveClass('border-red-500');
    expect(artistInputs[1]).not.toHaveClass('border-red-500');
  });

  it('displays concert day error message when present', () => {
    const errors = {
      concertDay: 'Concert date is required',
    };

    render(<FormSection formData={defaultFormData} errors={errors} />);

    expect(screen.getByText('Concert date is required')).toBeInTheDocument();
  });

  it('displays concert time error message when present', () => {
    const errors = {
      concertTime: 'Concert time is required',
    };

    render(<FormSection formData={defaultFormData} errors={errors} />);

    expect(screen.getByText('Concert time is required')).toBeInTheDocument();
  });
});
