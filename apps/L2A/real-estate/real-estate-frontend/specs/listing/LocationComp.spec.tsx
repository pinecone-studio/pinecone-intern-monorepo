import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LocationComp from '@/app/listing/_components/LocationComp';

jest.mock('@/components/ui/label', () => ({
  Label: ({ children }: { children: React.ReactNode }) => <label>{children}</label>,
}));

jest.mock('@/generated', () => ({
  useGetPostsQuery: () => ({
    data: {
      getPosts: [
        { location: { city: 'Ulaanbaatar', district: 'Sukhbaatar' } },
        { location: { city: 'Erdenet', district: 'Bayangol' } },
        { location: { city: 'Ulaanbaatar', district: 'Sukhbaatar' } },
      ],
    },
  }),
}));

describe('LocationComp', () => {
  it('renders label and both selects with default options', () => {
    render(<LocationComp setCity={jest.fn()} setDistrict={jest.fn()} />);
    expect(screen.getByText('Байршил')).toBeInTheDocument();
    expect(screen.getByTestId('select-city')).toBeInTheDocument();
    expect(screen.getByTestId('select-district')).toBeInTheDocument();
    expect(screen.getByText('Бүх хотууд')).toBeInTheDocument();
    expect(screen.getByText('Бүх дүүрэг')).toBeInTheDocument();
  });

  it('renders unique city and district options', () => {
    render(<LocationComp setCity={jest.fn()} setDistrict={jest.fn()} />);
    expect(screen.getByText('Ulaanbaatar')).toBeInTheDocument();
    expect(screen.getByText('Erdenet')).toBeInTheDocument();
    expect(screen.getByText('Sukhbaatar')).toBeInTheDocument();
    expect(screen.getByText('Bayangol')).toBeInTheDocument();
  });

  it('calls setCity and setDistrict on selection', () => {
    const setCity = jest.fn();
    const setDistrict = jest.fn();
    render(<LocationComp setCity={setCity} setDistrict={setDistrict} />);

    fireEvent.change(screen.getByTestId('select-city'), {
      target: { value: 'Ulaanbaatar' },
    });
    expect(setCity).toHaveBeenCalledWith('Ulaanbaatar');

    fireEvent.change(screen.getByTestId('select-district'), {
      target: { value: 'Bayangol' },
    });
    expect(setDistrict).toHaveBeenCalledWith('Bayangol');
  });
});
