/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Formik } from 'formik';
import ImagesSection from '@/app/user-listing/edit/_components/ImagesSection';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

const renderWithFormik = (initialValues = { images: [], selectedImageIndex: null }) => {
  return render(
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <ImagesSection />
    </Formik>
  );
};

describe('ImagesSection', () => {
  it('renders heading, instructions, and upload button', () => {
    renderWithFormik();

    expect(screen.getByText('Зураг')).toBeInTheDocument();
    expect(screen.getByText(/Please upload property images/)).toBeInTheDocument();
    expect(screen.getByTestId('upload-button')).toBeInTheDocument();
  });

  it('shows no images initially if images array is empty', () => {
    renderWithFormik();
    expect(screen.getByTestId('image-grid').childElementCount).toBe(0);
  });

  it('adds a new image when upload button is clicked', () => {
    renderWithFormik();

    fireEvent.click(screen.getByTestId('upload-button'));
    expect(screen.getByTestId('image-0')).toBeInTheDocument();
  });

  it('selects an image when clicked', () => {
    renderWithFormik({ images: ['/listingcard.png'], selectedImageIndex: null });

    const card = screen.getByTestId('image-card-0');
    fireEvent.click(card);

    expect(card.className).toContain('ring-2');
  });

  it('removes an image when remove button is clicked', () => {
    renderWithFormik({ images: ['/listingcard.png'], selectedImageIndex: 0 });

    fireEvent.click(screen.getByTestId('remove-button-0'));
    expect(screen.queryByTestId('image-0')).not.toBeInTheDocument();
  });

it('remove button stops propagation and does not trigger selection', () => {
  const setFieldValue = jest.fn();
  jest.spyOn(require('formik'), 'useFormikContext').mockReturnValue({
    values: {
      images: ['/listingcard.png'],
      selectedImageIndex: null,
    },
    setFieldValue,
  });
  render(<ImagesSection />);
  fireEvent.click(screen.getByTestId('remove-button-0'));
  const calledWithSelectedIndex0 = setFieldValue.mock.calls.some(
    ([field, value]) => field === 'selectedImageIndex' && value === 0
  );
  expect(calledWithSelectedIndex0).toBe(false);
});

it('handles undefined images gracefully by falling back to empty array', () => {
  const setFieldValue = jest.fn();
  jest.spyOn(require('formik'), 'useFormikContext').mockReturnValue({
    values: { selectedImageIndex: null }, 
    setFieldValue,
  });
  render(<ImagesSection />);
  expect(screen.getByTestId('image-grid').childElementCount).toBe(0);
});
});
