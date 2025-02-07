import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import '@testing-library/jest-dom';
import BalconyLiftSection from '@/components/addEstate/BalconyLiftSection';

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
      balcony: undefined,
      lift: undefined,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('BalconyLiftSection', () => {
  it('renders section correctly', () => {
    render(
      <FormProviderWrapper>
        <BalconyLiftSection />
      </FormProviderWrapper>
    );
    expect(screen.getByText('Тагт ба лифт')).toBeInTheDocument();
  });

  it('renders select fields with placeholders', () => {
    render(
      <FormProviderWrapper>
        <BalconyLiftSection />
      </FormProviderWrapper>
    );
    const triggers = screen.getAllByText('Сонгоно уу');
    expect(triggers).toHaveLength(2);
  });

  it('handles balcony selection', () => {
    render(
      <FormProviderWrapper>
        <BalconyLiftSection />
      </FormProviderWrapper>
    );
    const balconyTrigger = screen.getAllByRole('combobox')[0];
    fireEvent.click(balconyTrigger);
    expect(screen.getAllByTestId('select-content')[0]).toBeInTheDocument();
  });

  it('handles lift selection', () => {
    render(
      <FormProviderWrapper>
        <BalconyLiftSection />
      </FormProviderWrapper>
    );
    const liftTrigger = screen.getAllByRole('combobox')[1];
    fireEvent.click(liftTrigger);
    expect(screen.getAllByTestId('select-content')[1]).toBeInTheDocument();
  });
});
