import '@testing-library/jest-dom';
import { RadioInput } from '@/components/admin';
import { render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaFood } from '@/utils/FormSchemas';

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

    expect(getByTestId('create-food-activestatus-input')).toBeInTheDocument();
    expect(getByTestId('create-food-inactivestatus-input')).toBeInTheDocument();
  });
});
