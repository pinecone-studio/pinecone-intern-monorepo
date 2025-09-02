import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { ProfessionSchoolFields } from '@/components/ProfessionSchoolFields';
import { profileFormSchema } from '@/components/schema/ProfileFormSchema';
import { z } from 'zod';

const TestComponent = () => {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    defaultValues: {
      profession: '',
      school: '',
    },
  });

  return (
    <Form {...form}>
      <ProfessionSchoolFields control={form.control} />
    </Form>
  );
};

describe('ProfessionSchoolFields', () => {
  it('renders profession field', () => {
    render(<TestComponent />);
    expect(screen.getByLabelText(/profession/i)).toBeInTheDocument();
  });

  it('renders school/work field', () => {
    render(<TestComponent />);
    expect(screen.getByLabelText(/school\/work/i)).toBeInTheDocument();
  });

  it('renders both input fields', () => {
    render(<TestComponent />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(2);
  });
});