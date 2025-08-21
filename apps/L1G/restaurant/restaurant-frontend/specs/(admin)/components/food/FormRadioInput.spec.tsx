import '@testing-library/jest-dom';
import { RadioInput } from '@/components/admin';
import { render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaFood } from '@/helpers/form-schemas';

const TestWrapper = () => {
  const methods = useForm<z.infer<typeof formSchemaFood>>();
  return (
    <FormProvider {...methods}>
      <RadioInput control={methods.control} />
    </FormProvider>
  );
};
describe('RadioInput', () => {
  it('should render', () => {
    const { getByTestId } = render(<TestWrapper />);

    expect(getByTestId('food-status-active')).toBeInTheDocument();
    expect(getByTestId('food-status-inactive')).toBeInTheDocument();
  });
});
