import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import '@testing-library/jest-dom';
import FloorDetailsSection from '@/components/addEstate/FloorDetailsSection';

jest.mock('@/components/ui/select', () => {
  const actual = jest.requireActual('@/components/ui/select');
  return {
    ...actual,
    SelectContent: ({ children }: { children: React.ReactNode }) => (
      <div role="listbox" data-testid="select-content">
        {children}
      </div>
    ),
    SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
      <div role="option" data-value={value}>
        {children}
      </div>
    ),
  };
});

const FormProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      floorNumber: 0,
      totalFloors: 0,
      floorMaterial: undefined,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('FloorDetailsSection', () => {
  it('renders section correctly', () => {
    render(
      <FormProviderWrapper>
        <FloorDetailsSection />
      </FormProviderWrapper>
    );
    expect(screen.getByText('Давхрын мэдээлэл')).toBeInTheDocument();
  });

  it('renders form fields', () => {
    render(
      <FormProviderWrapper>
        <FloorDetailsSection />
      </FormProviderWrapper>
    );
    expect(screen.getByLabelText('Хэддүгээр давхар:')).toBeInTheDocument();
    expect(screen.getByLabelText('Нийт давхар:')).toBeInTheDocument();
    expect(screen.getByLabelText('Шалны материал:')).toBeInTheDocument();
  });

  it('handles number inputs', () => {
    render(
      <FormProviderWrapper>
        <FloorDetailsSection />
      </FormProviderWrapper>
    );

    const floorNumberInput = screen.getByLabelText('Хэддүгээр давхар:');
    fireEvent.change(floorNumberInput, { target: { value: '5' } });
    expect(floorNumberInput).toHaveValue(5);

    const totalFloorsInput = screen.getByLabelText('Нийт давхар:');
    fireEvent.change(totalFloorsInput, { target: { value: '10' } });
    expect(totalFloorsInput).toHaveValue(10);
  });

  it('handles floor material selection', () => {
    render(
      <FormProviderWrapper>
        <FloorDetailsSection />
      </FormProviderWrapper>
    );

    const materialSelect = screen.getByRole('combobox');
    fireEvent.click(materialSelect);

    expect(screen.getByTestId('select-content')).toBeInTheDocument();
    expect(screen.getByText('Мод')).toBeInTheDocument();
    expect(screen.getByText('Ламинат')).toBeInTheDocument();
  });
});
