import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import PropertyDetails from '@/components/addEstate/PropertyDetails';
import { HouseTypeEnum } from '@/generated';

describe('PropertyDetails Component', () => {
  const mockHandleChange = jest.fn();
  const initialFormData = {
    houseType: null,
    title: '',
    price: 0,
    size: '',
    totalRooms: 0,
    garage: '',
  };

  beforeEach(() => {
    mockHandleChange.mockClear();
  });

  it('renders all input fields correctly', () => {
    const { getByLabelText } = render(<PropertyDetails formData={initialFormData} handleChange={mockHandleChange} />);

    expect(getByLabelText(/Байшингийн төрөл:/i)).toBeInTheDocument();
    expect(getByLabelText(/Нэр:/i)).toBeInTheDocument();
    expect(getByLabelText(/Үнэ:/i)).toBeInTheDocument();
    expect(getByLabelText(/Хэмжээ:/i)).toBeInTheDocument();
    expect(getByLabelText(/Нийт өрөө:/i)).toBeInTheDocument();
    expect(getByLabelText(/Гараж:/i)).toBeInTheDocument();
  });

  it('calls handleChange when house type is selected', async () => {
    const { getByLabelText } = render(<PropertyDetails formData={initialFormData} handleChange={mockHandleChange} />);
    const houseTypeSelect = getByLabelText(/Байшингийн төрөл:/i);
    await userEvent.selectOptions(houseTypeSelect, HouseTypeEnum.Apartment);
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('calls handleChange when title is entered', async () => {
    const { getByLabelText } = render(<PropertyDetails formData={initialFormData} handleChange={mockHandleChange} />);
    const titleInput = getByLabelText(/Нэр:/i);
    await userEvent.type(titleInput, 'Test Property');
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('handles numeric inputs correctly', async () => {
    const { getByLabelText } = render(<PropertyDetails formData={initialFormData} handleChange={mockHandleChange} />);
    const priceInput = getByLabelText(/Үнэ:/i);
    const roomsInput = getByLabelText(/Нийт өрөө:/i);

    await userEvent.type(priceInput, '100000');
    await userEvent.type(roomsInput, '3');

    // Depending on your implementation, onChange may fire once per field.
    expect(mockHandleChange).toHaveBeenCalledTimes(2);
  });

  it('renders house type options correctly', () => {
    const { getByLabelText } = render(<PropertyDetails formData={initialFormData} handleChange={mockHandleChange} />);
    const houseTypeSelect = getByLabelText(/Байшингийн төрөл:/i) as HTMLSelectElement;
    expect(houseTypeSelect.options).toHaveLength(4);

    const options = [
      { value: '', text: 'Сонгоно уу' },
      { value: HouseTypeEnum.Apartment, text: 'Орон сууц' },
      { value: HouseTypeEnum.House, text: 'Хувийн сууц' },
      { value: HouseTypeEnum.Office, text: 'Оффис' },
    ];

    options.forEach((option, index) => {
      expect(houseTypeSelect.options[index].value).toBe(option.value);
      expect(houseTypeSelect.options[index].text).toBe(option.text);
    });
  });

  it('handles undefined values in select inputs', () => {
    const undefinedFormData = {
      ...initialFormData,
      houseType: undefined,
      garage: undefined,
    };
    const { getByLabelText } = render(<PropertyDetails formData={undefinedFormData} handleChange={mockHandleChange} />);
    expect(getByLabelText(/Байшингийн төрөл:/i)).toHaveValue('');
    expect(getByLabelText(/Гараж:/i)).toHaveValue('');
  });

  it('handles null values in select inputs', () => {
    const nullFormData = {
      ...initialFormData,
      houseType: null,
      garage: null,
    };
    const { getByLabelText } = render(<PropertyDetails formData={nullFormData} handleChange={mockHandleChange} />);
    expect(getByLabelText(/Байшингийн төрөл:/i)).toHaveValue('');
    expect(getByLabelText(/Гараж:/i)).toHaveValue('');
  });

  it('handles empty string values in select inputs', () => {
    const emptyStringFormData = {
      ...initialFormData,
      houseType: '',
      garage: '',
    };
    const { getByLabelText } = render(<PropertyDetails formData={emptyStringFormData} handleChange={mockHandleChange} />);
    expect(getByLabelText(/Байшингийн төрөл:/i)).toHaveValue('');
    expect(getByLabelText(/Гараж:/i)).toHaveValue('');
  });

  // New Test to cover fallback branches (nullish coalescing) in numeric and text fields.
  it('renders fallback values correctly when numeric/text fields are undefined', () => {
    const undefinedFormData = {
      houseType: '',
      title: '',
      price: undefined,
      size: undefined,
      totalRooms: undefined,
      garage: '',
    };
    const { getByLabelText } = render(<PropertyDetails formData={undefinedFormData} handleChange={mockHandleChange} />);
    const priceInput = getByLabelText(/Үнэ:/i);
    const sizeInput = getByLabelText(/Хэмжээ:/i);
    const roomsInput = getByLabelText(/Нийт өрөө:/i);

    expect(priceInput.getAttribute('value')).toBe('');
    expect(sizeInput.getAttribute('value')).toBe('');
    expect(roomsInput).toHaveValue(0);
  });
});
