import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import '@testing-library/jest-dom';
import PropertyDetails from '@/components/addEstate/PropertyDetails';

const FormProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      title: '',
      price: 0,
      houseType: undefined,
      size: 0,
      totalRooms: 0,
      garage: false,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('PropertyDetails', () => {
  it('renders all form fields', () => {
    render(
      <FormProviderWrapper>
        <PropertyDetails />
      </FormProviderWrapper>
    );

    expect(screen.getByText('Ерөнхий мэдээлэл')).toBeInTheDocument();
    expect(screen.getByLabelText('Гарчиг:')).toBeInTheDocument();
    expect(screen.getByLabelText('Үнэ:')).toBeInTheDocument();
    expect(screen.getByLabelText('Байшингийн төрөл:')).toBeInTheDocument();
    expect(screen.getByLabelText('Талбайн хэмжээ (м²):')).toBeInTheDocument();
    expect(screen.getByLabelText('Гараж:')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(
      <FormProviderWrapper>
        <PropertyDetails />
      </FormProviderWrapper>
    );

    const titleInput = screen.getByLabelText('Гарчиг:');
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    expect(titleInput).toHaveValue('Test Title');

    const priceInput = screen.getByLabelText('Үнэ:');
    fireEvent.change(priceInput, { target: { value: '1000' } });
    expect(priceInput).toHaveValue(1000);
  });

  it('shows select trigger buttons', () => {
    render(
      <FormProviderWrapper>
        <PropertyDetails />
      </FormProviderWrapper>
    );

    expect(screen.getByRole('combobox', { name: /Байшингийн төрөл/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Гараж/i })).toBeInTheDocument();
  });
});
