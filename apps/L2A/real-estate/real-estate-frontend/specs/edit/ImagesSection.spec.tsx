import ImagesSection from '@/app/user-listing/edit/_components/ImagesSection';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ImagesSection', () => {
  it('renders title and description text', () => {
    render(<ImagesSection />);

    expect(screen.getByText('Зураг')).toBeInTheDocument();
    expect(
      screen.getByText(/Please tell us the name of the guest/i)
    ).toBeInTheDocument();
  });

  it('renders + Зураг оруулах button', () => {
    render(<ImagesSection />);
    const uploadButton = screen.getByRole('button', { name: '+ Зураг оруулах' });
    expect(uploadButton).toBeInTheDocument();
    expect(uploadButton).toBeVisible(); 
  });

  it('renders 9 images by default', () => {
    render(<ImagesSection />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(9);
    images.forEach((img, i) => {
      expect(img).toHaveAttribute('src', '/listingcard.png');
      expect(img).toHaveAttribute('alt', `property-${i}`);
    });
  });

  it('highlights the selected image when clicked', () => {
    render(<ImagesSection />);
    const containers = screen.getAllByRole('img').map((img) => img.closest('div')!);

    fireEvent.click(containers[2]); 
    expect(containers[2].className).toMatch(/ring-2 ring-purple-500/);

    containers.forEach((container, i) => {
      if (i !== 2) {
        expect(container.className).not.toMatch(/ring-2 ring-purple-500/);
      }
    });
  });
  it('has no selected image by default', () => {
  render(<ImagesSection />);
  const containers = screen.getAllByRole('img').map((img) => img.closest('div')!);

  containers.forEach((container) => {
    expect(container.className).not.toMatch(/ring-2 ring-purple-500/);
  });
});
it('adds an image when upload button is clicked', () => {
  render(<ImagesSection />);
  const uploadBtn = screen.getByRole('button', { name: '+ Зураг оруулах' });

  fireEvent.click(uploadBtn);

  const images = screen.getAllByRole('img');
  expect(images).toHaveLength(10); 
});


  it('clicking × button does not select image', () => {
    render(<ImagesSection />);
    const closeButtons = screen.getAllByText('×');
    const containers = screen.getAllByRole('img').map((img) => img.closest('div')!);

    fireEvent.click(closeButtons[0]); 
    expect(containers[0].className).not.toMatch(/ring-2 ring-purple-500/);
  });
});
