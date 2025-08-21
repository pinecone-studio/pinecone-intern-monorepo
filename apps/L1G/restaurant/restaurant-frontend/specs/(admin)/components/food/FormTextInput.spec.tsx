import '@testing-library/jest-dom';
import { TextInput } from '@/components/admin';
import { render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaFood } from '@/helpers/form-schemas';

const TestWrapper = () => {
  const methods = useForm<z.infer<typeof formSchemaFood>>();
  return (
    <FormProvider {...methods}>
      <TextInput control={methods.control} placeholder="price" fieldName="price" />
    </FormProvider>
  );
};

describe('TextInput', () => {
  it('should render', () => {
    const { getByPlaceholderText } = render(<TestWrapper />);
    expect(getByPlaceholderText('price')).toBeInTheDocument();
  });
});
