import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import '@testing-library/jest-dom';
import DescriptionSection from '@/components/addEstate/DescriptionSection';

const FormProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      description: '',
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('DescriptionSection', () => {
  it('renders with required elements', () => {
    render(
      <FormProviderWrapper>
        <DescriptionSection />
      </FormProviderWrapper>
    );

    expect(screen.getByText('Тайлбар')).toBeInTheDocument();
    expect(screen.getByText(/Та үл хөдлөх хөрөнгийн дэлгэрэнгүй тайлбарыг оруулна уу/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Дэлгэрэнгүй тайлбар:/)).toBeInTheDocument();
  });

  it('handles text input', () => {
    render(
      <FormProviderWrapper>
        <DescriptionSection />
      </FormProviderWrapper>
    );

    const textarea = screen.getByLabelText(/Дэлгэрэнгүй тайлбар:/);
    fireEvent.change(textarea, { target: { value: 'Test description' } });
    expect(textarea).toHaveValue('Test description');
  });

  it('shows placeholder text', () => {
    render(
      <FormProviderWrapper>
        <DescriptionSection />
      </FormProviderWrapper>
    );

    expect(screen.getByPlaceholderText('Тайлбар оруулна уу')).toBeInTheDocument();
  });
});
