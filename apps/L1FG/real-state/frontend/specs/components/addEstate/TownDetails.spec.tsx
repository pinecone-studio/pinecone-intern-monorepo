import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import '@testing-library/jest-dom';
import TownDetails from '@/components/addEstate/TownDetails';

jest.mock('@/components/ui/select', () => ({
  ...jest.requireActual('@/components/ui/select'),
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
}));

const FormProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      city: undefined,
      district: undefined,
      subDistrict: undefined,
      address: '',
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('TownDetails', () => {
  it('renders section correctly', () => {
    render(
      <FormProviderWrapper>
        <TownDetails />
      </FormProviderWrapper>
    );
    expect(screen.getByText('Байршил')).toBeInTheDocument();
  });

  it('renders form fields', () => {
    render(
      <FormProviderWrapper>
        <TownDetails />
      </FormProviderWrapper>
    );
    expect(screen.getByLabelText('Хот:')).toBeInTheDocument();
    expect(screen.getByLabelText('Дүүрэг:')).toBeInTheDocument();
    expect(screen.getByLabelText('Хороо:')).toBeInTheDocument();
  });

  it('handles selections', () => {
    render(
      <FormProviderWrapper>
        <TownDetails />
      </FormProviderWrapper>
    );
    const citySelect = screen.getAllByRole('combobox')[0];
    fireEvent.click(citySelect);
    expect(screen.getAllByTestId('select-content')[0]).toBeInTheDocument();
  });

  it('handles address input', () => {
    render(
      <FormProviderWrapper>
        <TownDetails />
      </FormProviderWrapper>
    );
    const input = screen.getByPlaceholderText('Дэлгэрэнгүй хаяг');
    fireEvent.change(input, { target: { value: 'Test Address' } });
    expect(input).toHaveValue('Test Address');
  });
});
