import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import '@testing-library/jest-dom';
import WindowsSection from '@/components/addEstate/WindowsSection';

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
      windowsCount: 0,
      windowType: undefined,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('WindowsSection', () => {
  it('renders section correctly', () => {
    render(
      <FormProviderWrapper>
        <WindowsSection />
      </FormProviderWrapper>
    );
    expect(screen.getByText('Цонх')).toBeInTheDocument();
  });

  it('renders form fields', () => {
    render(
      <FormProviderWrapper>
        <WindowsSection />
      </FormProviderWrapper>
    );
    expect(screen.getByLabelText('Цонхны тоо:')).toBeInTheDocument();
    expect(screen.getByLabelText('Цонхны төрөл:')).toBeInTheDocument();
  });

  it('handles window count input', () => {
    render(
      <FormProviderWrapper>
        <WindowsSection />
      </FormProviderWrapper>
    );
    const input = screen.getByLabelText('Цонхны тоо:');
    fireEvent.change(input, { target: { value: '5' } });
    expect(input).toHaveValue(5);
  });

  it('handles window type selection', () => {
    render(
      <FormProviderWrapper>
        <WindowsSection />
      </FormProviderWrapper>
    );
    const typeSelect = screen.getAllByRole('combobox')[0];
    fireEvent.click(typeSelect);
    expect(screen.getAllByTestId('select-content')[0]).toBeInTheDocument();
  });
});
