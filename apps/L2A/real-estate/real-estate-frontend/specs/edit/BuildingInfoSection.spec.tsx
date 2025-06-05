import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BuildingInfoSection from '@/app/user-listing/edit/_components/BuildingInfoSection';
import { useFormikContext } from 'formik';

// 🧠 Mock formik context
jest.mock('formik', () => ({
  useFormikContext: jest.fn(),
}));

describe('BuildingInfoSection ', () => {
  const mockSetFieldValue = jest.fn();
  const mockValues = {
    completionDate: '2012',
    windowsCount: 6,
    windowType: 'Төмөр вакум',
    door: 'Төмөр вакум',
    floorNumber: 4,
    totalFloors: 5,
    flooring: 'Ламинат',
    balcony: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useFormikContext as jest.Mock).mockReturnValue({
      values: mockValues,
      setFieldValue: mockSetFieldValue,
    });
  });

  it('renders all fields with initial values', () => {
    render(<BuildingInfoSection />);
    expect(screen.getByDisplayValue('2012')).toBeInTheDocument();
    expect(screen.getByDisplayValue('6')).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('Төмөр вакум')).toHaveLength(2);
    expect(screen.getByDisplayValue('4')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Ламинат')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2 тагттай')).toBeInTheDocument();
  });
it('renders with empty values (fallback defaults)', () => {
  (useFormikContext as jest.Mock).mockReturnValue({
    values: {
      completionDate: undefined,
      windowsCount: undefined,
      windowType: undefined,
      door: undefined,
      floorNumber: undefined,
      totalFloors: undefined,
      flooring: undefined,
      balcony: false,
    },
    setFieldValue: mockSetFieldValue,
  });

  render(<BuildingInfoSection />);

  expect(screen.getByTestId('input-built-year')).toHaveValue('');
  expect(screen.getByTestId('input-window-count')).toHaveValue(null); 
  expect(screen.getByTestId('input-window-type')).toHaveValue('');
  expect(screen.getByTestId('input-door-type')).toHaveValue('');
  expect(screen.getByTestId('input-floor')).toHaveValue(null);
  expect(screen.getByTestId('input-building-floors')).toHaveValue(null);
  expect(screen.getByTestId('input-flooring')).toHaveValue('');
  expect(screen.getByTestId('input-balcony')).toHaveValue('');
});
  it('calls setFieldValue for all input changes', () => {
    render(<BuildingInfoSection />);

    fireEvent.change(screen.getByTestId('input-built-year'), {
      target: { value: '2015' },
    });
    expect(mockSetFieldValue).toHaveBeenCalledWith('completionDate', '2015');

    fireEvent.change(screen.getByTestId('input-window-count'), {
      target: { value: '8' },
    });
    expect(mockSetFieldValue).toHaveBeenCalledWith('windowsCount', '8');

    fireEvent.change(screen.getByTestId('input-window-type'), {
      target: { value: 'Мод' },
    });
    expect(mockSetFieldValue).toHaveBeenCalledWith('windowType', 'Мод');

    fireEvent.change(screen.getByTestId('input-door-type'), {
      target: { value: 'Хүрэл' },
    });
    expect(mockSetFieldValue).toHaveBeenCalledWith('door', 'Хүрэл');

    fireEvent.change(screen.getByTestId('input-floor'), {
      target: { value: '3' },
    });
    expect(mockSetFieldValue).toHaveBeenCalledWith('floorNumber', '3');

    fireEvent.change(screen.getByTestId('input-building-floors'), {
      target: { value: '7' },
    });
    expect(mockSetFieldValue).toHaveBeenCalledWith('totalFloors', '7');

    fireEvent.change(screen.getByTestId('input-flooring'), {
      target: { value: 'Паркет' },
    });
    expect(mockSetFieldValue).toHaveBeenCalledWith('flooring', 'Паркет');

    fireEvent.change(screen.getByTestId('input-balcony'), {
      target: { value: 'тагтгүй' }, 
    });
    expect(mockSetFieldValue).toHaveBeenCalledWith('balcony', true);

    fireEvent.change(screen.getByTestId('input-balcony'), {
      target: { value: 'no' }, 
    });
    expect(mockSetFieldValue).toHaveBeenCalledWith('balcony', false);
  });
});
