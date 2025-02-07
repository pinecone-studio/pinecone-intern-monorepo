import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import '@testing-library/jest-dom';
import RestroomsSection from '@/components/addEstate/RestroomsSection';

const FormProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      restrooms: 0,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('RestroomsSection', () => {
  it('renders with required elements', () => {
    render(
      <FormProviderWrapper>
        <RestroomsSection />
      </FormProviderWrapper>
    );

    expect(screen.getByText('Ариун цэврийн өрөө')).toBeInTheDocument();
    expect(screen.getByText('Та ариун цэврийн өрөөний тоог оруулна уу.')).toBeInTheDocument();
    expect(screen.getByLabelText(/Ариун цэврийн өрөөний тоо:/i)).toBeInTheDocument();
  });

  it('handles number input correctly', () => {
    render(
      <FormProviderWrapper>
        <RestroomsSection />
      </FormProviderWrapper>
    );

    const input = screen.getByLabelText(/Ариун цэврийн өрөөний тоо:/i);
    fireEvent.change(input, { target: { value: '2' } });
    expect(input).toHaveValue(2);
  });

  it('prevents negative values', () => {
    render(
      <FormProviderWrapper>
        <RestroomsSection />
      </FormProviderWrapper>
    );

    const input = screen.getByLabelText(/Ариун цэврийн өрөөний тоо:/i);
    expect(input).toHaveAttribute('min', '0');
  });
});
