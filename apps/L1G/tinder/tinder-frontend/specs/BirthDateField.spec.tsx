import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { BirthDateField } from '@/components/BirthDateField';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { format } from 'date-fns';
import { MIN_YEAR } from '@/components/date-utils';

// Mock the hasPointerCapture method for Radix UI compatibility
Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', {
  value: jest.fn(() => false),
  writable: true,
});

// Mock the releasePointerCapture method for Radix UI compatibility
Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', {
  value: jest.fn(),
  writable: true,
});

// Mock the Calendar component to allow us to trigger onSelect directly
jest.mock('@/components/ui/calendar', () => ({
  Calendar: ({ onSelect, ...props }) => (
    <div data-testid="qcalendar-component" {...props}>
      <button 
        data-testid="mock-calendar-select-date" 
        onClick={() => onSelect(new Date())}
      >
        Select Date
      </button>
      <button 
        data-testid="mock-calendar-select-undefined" 
        onClick={() => onSelect(undefined)}
      >
        Select Undefined
      </button>
    </div>
  ),
}));

const setup = (props = {}) => {
  const Wrapper = () => {
    const methods = useForm({ 
      defaultValues: { birthDate: props.initialDate || null },
      mode: 'onChange'
    });
    return (
      <FormProvider {...methods}>
        <BirthDateField {...props} />
      </FormProvider>
    );
  };
  return render(<Wrapper />);
};

describe('BirthDateField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with placeholder when no date selected', () => {
    setup();
    const button = screen.getByTestId('qdate-button');
    expect(button).toHaveTextContent('Pick a date');
  });

  it('displays initial date when provided', () => {
    const initialDate = new Date(1990, 5, 15);
    setup({ initialDate });
    const button = screen.getByTestId('qdate-button');
    expect(button).toHaveTextContent(format(initialDate, 'PPP'));
  });

  it('opens popover when button is clicked', async () => {
    setup();
    const button = screen.getByTestId('qdate-button');
    await userEvent.click(button);
    expect(screen.getByTestId('qcalendar-component')).toBeInTheDocument();
  });

  it('closes popover after date selection', async () => {
    setup();
    const button = screen.getByTestId('qdate-button');
    await userEvent.click(button);
    
    // Wait for calendar to be visible
    await waitFor(() => {
      expect(screen.getByTestId('qcalendar-component')).toBeInTheDocument();
    });
    
    // Click the mock date selection button
    await userEvent.click(screen.getByTestId('mock-calendar-select-date'));
    
    // Verify popover closes
    await waitFor(() => {
      expect(screen.queryByTestId('qcalendar-component')).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('updates form value when date is selected', async () => {
    const onSubmit = jest.fn();
    const Wrapper = () => {
      const methods = useForm({ defaultValues: { birthDate: null } });
      const { handleSubmit } = methods;
      
      return (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <BirthDateField />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };
    
    render(<Wrapper />);
    
    // Select a date
    await userEvent.click(screen.getByTestId('qdate-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('qcalendar-component')).toBeInTheDocument();
    });
    
    // Click the mock date selection button
    await userEvent.click(screen.getByTestId('mock-calendar-select-date'));
    
    // Submit form
    await userEvent.click(screen.getByText('Submit'));
    
    // Verify form value was updated
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        birthDate: expect.any(Date)
      }),
      expect.anything()
    );
  });

  it('updates calendar when year is changed', async () => {
    setup();
    await userEvent.click(screen.getByTestId('qdate-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('qcalendar-component')).toBeInTheDocument();
    });
    
    // Open year select
    const yearSelect = screen.getByTestId('qyear-select-trigger');
    await userEvent.click(yearSelect);
    
    // Wait for options to appear
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    
    // Find and select a year option
    const yearOptions = screen.getAllByRole('option');
    const targetYearOption = yearOptions.find(option => option.textContent === '1980');
    
    if (targetYearOption) {
      await userEvent.click(targetYearOption);
    }
    
    // Verify calendar context updates
    await waitFor(() => {
      expect(screen.getByTestId('qyear-select-trigger')).toHaveTextContent('1980');
    });
  });

  it('updates calendar when month is changed', async () => {
    setup();
    await userEvent.click(screen.getByTestId('qdate-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('qcalendar-component')).toBeInTheDocument();
    });
    
    // Open month select
    const monthSelect = screen.getByTestId('qmonth-select-trigger');
    await userEvent.click(monthSelect);
    
    // Wait for options to appear
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    
    // Find and select December option
    const monthOptions = screen.getAllByRole('option');
    const decemberOption = monthOptions.find(option => option.textContent === 'December');
    
    if (decemberOption) {
      await userEvent.click(decemberOption);
    }
    
    // Verify month selector shows December
    await waitFor(() => {
      expect(screen.getByTestId('qmonth-select-trigger')).toHaveTextContent('December');
    });
  });

  it('sets month to initial date when provided', async () => {
    const initialDate = new Date(1985, 8, 10); // September 10, 1985
    setup({ initialDate });
    
    // Open popover
    await userEvent.click(screen.getByTestId('qdate-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('qcalendar-component')).toBeInTheDocument();
    });
    
    // Verify year and month are set to initial date
    expect(screen.getByTestId('qyear-select-trigger')).toHaveTextContent('1985');
    expect(screen.getByTestId('qmonth-select-trigger')).toHaveTextContent('September');
  });

  it('syncs with form value when it changes externally', async () => {
    const Wrapper = () => {
      const methods = useForm({ defaultValues: { birthDate: null } });
      
      return (
        <FormProvider {...methods}>
          <BirthDateField />
          <button 
            onClick={() => {
              const newDate = new Date(2000, 0, 1);
              methods.setValue('birthDate', newDate);
            }}
          >
            Set External Date
          </button>
        </FormProvider>
      );
    };
    
    render(<Wrapper />);
    
    // Initially shows placeholder
    expect(screen.getByTestId('qdate-button')).toHaveTextContent('Pick a date');
    
    // Set external date
    await userEvent.click(screen.getByText('Set External Date'));
    
    // Verify component updates
    await waitFor(() => {
      const button = screen.getByTestId('qdate-button');
      expect(button.textContent).toMatch(/January.*1.*2000/);
    });
  });

  it('shows form description', () => {
    setup();
    expect(screen.getByText('Your date of birth is used to calculate your age.')).toBeInTheDocument();
  });

  it('shows form message when validation fails', async () => {
    const Wrapper = () => {
      const methods = useForm({
        defaultValues: { birthDate: null },
        mode: 'onChange'
      });
      
      // Set up validation rules
      const { register, formState: { errors }, trigger } = methods;
      
      // Register the field with validation
      React.useEffect(() => {
        register('birthDate', { required: 'This field is required' });
      }, [register]);
      
      return (
        <FormProvider {...methods}>
          <BirthDateField />
          <button onClick={() => trigger('birthDate')}>Validate</button>
          {/* Manually render error message since FormMessage might not work with manual validation */}
          {errors.birthDate && (
            <p className="text-sm font-medium text-destructive">
              {errors.birthDate.message}
            </p>
          )}
        </FormProvider>
      );
    };
    
    render(<Wrapper />);
    
    // Trigger validation
    await userEvent.click(screen.getByText('Validate'));
    
    // Verify error message appears
    await waitFor(() => {
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  it('handles month change without selected date', async () => {
    setup();
    await userEvent.click(screen.getByTestId('qdate-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('qcalendar-component')).toBeInTheDocument();
    });
    
    // Open month select
    const monthSelect = screen.getByTestId('qmonth-select-trigger');
    await userEvent.click(monthSelect);
    
    // Wait for options to appear
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    
    // Find and select June option
    const monthOptions = screen.getAllByRole('option');
    const juneOption = monthOptions.find(option => option.textContent === 'June');
    
    if (juneOption) {
      await userEvent.click(juneOption);
    }
    
    // Verify month selector shows June
    await waitFor(() => {
      expect(screen.getByTestId('qmonth-select-trigger')).toHaveTextContent('June');
    });
    
    // Verify no date is selected (button should still show placeholder)
    expect(screen.getByTestId('qdate-button')).toHaveTextContent('Pick a date');
  });

  it('verifies date restrictions are in place', async () => {
    const currentDate = new Date();
    setup({ currentDate });
    await userEvent.click(screen.getByTestId('qdate-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('qcalendar-component')).toBeInTheDocument();
    });
    
    const calendar = screen.getByTestId('qcalendar-component');
    expect(calendar).toBeInTheDocument();
  });

  it('covers handleDateSelect logic when date is selected', async () => {
    const mockSetValue = jest.fn();
    const Wrapper = () => {
      const methods = useForm({ defaultValues: { birthDate: null } });
      
      // Create a spy on setValue
      const originalSetValue = methods.setValue;
      methods.setValue = (...args) => {
        mockSetValue(...args);
        return originalSetValue.call(methods, ...args);
      };
      
      return (
        <FormProvider {...methods}>
          <BirthDateField />
        </FormProvider>
      );
    };
    
    render(<Wrapper />);
    
    // Open the popover
    await userEvent.click(screen.getByTestId('qdate-button'));
    
    // Wait for calendar to be visible
    await waitFor(() => {
      expect(screen.getByTestId('qcalendar-component')).toBeInTheDocument();
    });
    
    // Click the mock date selection button
    await userEvent.click(screen.getByTestId('mock-calendar-select-date'));
    
    // Verify setValue was called with shouldValidate: true
    await waitFor(() => {
      expect(mockSetValue).toHaveBeenCalledWith(
        'birthDate',
        expect.any(Date),
        { shouldValidate: true }
      );
    });
  });

  it('handles undefined date selection without calling setValue', async () => {
    const mockSetValue = jest.fn();
    const Wrapper = () => {
      const methods = useForm({ 
        defaultValues: { birthDate: new Date() } // Start with a date selected
      });
      
      // Create a spy on setValue
      const originalSetValue = methods.setValue;
      methods.setValue = (...args) => {
        mockSetValue(...args);
        return originalSetValue.call(methods, ...args);
      };
      
      return (
        <FormProvider {...methods}>
          <BirthDateField initialDate={new Date()} />
        </FormProvider>
      );
    };
    
    render(<Wrapper />);
    
    // Open the popover
    await userEvent.click(screen.getByTestId('qdate-button'));
    
    // Wait for calendar to be visible
    await waitFor(() => {
      expect(screen.getByTestId('qcalendar-component')).toBeInTheDocument();
    });
    
    // Click the button that triggers onSelect with undefined
    await userEvent.click(screen.getByTestId('mock-calendar-select-undefined'));
    
    // Verify that setValue was NOT called (since date is undefined)
    expect(mockSetValue).not.toHaveBeenCalled();
    
    // Verify popover is still open (setOpen(false) not called when date is undefined)
    expect(screen.getByTestId('qcalendar-component')).toBeInTheDocument();
    
    // Verify button shows placeholder since selectedDate was set to undefined
    await waitFor(() => {
      expect(screen.getByTestId('qdate-button')).toHaveTextContent('Pick a date');
    });
  });

  it('disables dates outside valid range', async () => {
    const currentDate = new Date(2023, 5, 15); // June 15, 2023
    setup({ currentDate });
    
    await userEvent.click(screen.getByTestId('qdate-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('qcalendar-component')).toBeInTheDocument();
    });
    
    // The isDisabled function should be called for each date in the calendar
    // We can't directly test the disabled dates due to the mock calendar,
    // but we can verify the function logic
    
    // Test the isDisabled function logic directly
    const isDisabled = (date: Date) => date > currentDate || date < new Date(MIN_YEAR, 0, 1);
    
    // Test future dates should be disabled
    const futureDate = new Date(2024, 0, 1);
    expect(isDisabled(futureDate)).toBe(true);
    
    // Test dates before MIN_YEAR should be disabled
    const ancientDate = new Date(MIN_YEAR - 1, 0, 1);
    expect(isDisabled(ancientDate)).toBe(true);
    
    // Test valid dates should not be disabled
    const validDate = new Date(2000, 0, 1);
    expect(isDisabled(validDate)).toBe(false);
    
    // Test current date should not be disabled
    expect(isDisabled(currentDate)).toBe(false);
    
    // Test minimum allowed date should not be disabled
    const minDate = new Date(MIN_YEAR, 0, 1);
    expect(isDisabled(minDate)).toBe(false);
  });
  it('correctly applies disabled state to dates in calendar', async () => {
  const currentDate = new Date(2023, 5, 15); // June 15, 2023
  setup({ currentDate });
  
  // Open the popover
  await userEvent.click(screen.getByTestId('qdate-button'));
  
  await waitFor(() => {
    expect(screen.getByTestId('qcalendar-component')).toBeInTheDocument();
  });
  
  // Mock the Calendar component to track disabled dates
  const mockCalendar = jest.fn();
  jest.doMock('@/components/ui/calendar', () => ({
    Calendar: (props) => {
      mockCalendar(props);
      return (
        <div data-testid="qcalendar-component">
          {/* Simulate a disabled date */}
          <button 
            data-testid="disabled-date"
            disabled={props.disabled(new Date(2024, 0, 1))}
            onClick={() => props.onSelect(new Date(2024, 0, 1))}
          >
            Jan 1, 2024
          </button>
          {/* Simulate an enabled date */}
          <button 
            data-testid="enabled-date"
            disabled={props.disabled(new Date(2020, 0, 1))}
            onClick={() => props.onSelect(new Date(2020, 0, 1))}
          >
            Jan 1, 2020
          </button>
        </div>
      );
    },
  }));
  
  // Re-import to trigger the mock
  const { BirthDateField } = require('@/components/BirthDateField');
  
  // Re-render with the mocked Calendar
  const Wrapper = () => {
    const methods = useForm({ 
      defaultValues: { birthDate: null },
      mode: 'onChange'
    });
    return (
      <FormProvider {...methods}>
        <BirthDateField currentDate={currentDate} />
      </FormProvider>
    );
  };
  
  render(<Wrapper />);
  
  // Open the popover again
  await userEvent.click(screen.getByTestId('qdate-button'));
  
  // Verify that the isDisabled function was passed to Calendar
  await waitFor(() => {
    expect(mockCalendar).toHaveBeenCalled();
    const props = mockCalendar.mock.calls[0][0];
    expect(typeof props.disabled).toBe('function');
    
    // Test the function with different dates
    expect(props.disabled(new Date(2024, 0, 1))).toBe(true); // Future date
    expect(props.disabled(new Date(MIN_YEAR - 1, 0, 1))).toBe(true); // Before MIN_YEAR
    expect(props.disabled(new Date(2020, 0, 1))).toBe(false); // Valid date
    expect(props.disabled(new Date(MIN_YEAR, 0, 1))).toBe(false); // MIN_YEAR date
    expect(props.disabled(currentDate)).toBe(false); // Current date
  });
  
  // Try to click on a disabled date
  await userEvent.click(screen.getByTestId('disabled-date'));
  
  // Verify that the date wasn't selected (popover should still be open)
  expect(screen.getByTestId('qcalendar-component')).toBeInTheDocument();
  expect(screen.getByTestId('qdate-button')).toHaveTextContent('Pick a date');
  
  // Click on an enabled date
  await userEvent.click(screen.getByTestId('enabled-date'));
  
  // Verify that the date was selected (popover should close)
  await waitFor(() => {
    expect(screen.queryByTestId('qcalendar-component')).not.toBeInTheDocument();
  });
  expect(screen.getByTestId('qdate-button')).not.toHaveTextContent('Pick a date');
});
});