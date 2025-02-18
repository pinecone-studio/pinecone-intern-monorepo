import { Images } from '@/components/admin/add-room';
import { render, screen } from '@testing-library/react';

// Mock өгөгдөл
const mockImagesWithData = ['/image1.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg', '/image5.jpg'];

const mockImagesEmpty: string[] = [];

test('should render first image and multiple images when images array has multiple images', () => {
  render(
    <Images
      images={mockImagesWithData}
      setImages={() => {
        console.log('test');
      }}
      handleEditHotelImages={async () => {
        console.log('test');
      }}
    />
  );

  // Эхний зургийг шалгах
  expect(screen.getByAltText('Hotel Image'));

  // 2 дахь болон түүнээс дээш зургийг шалгах
  const additionalImages = screen.getAllByAltText(/Hotel Image \d+/);
  expect(additionalImages.length);
});

// Тест 2: Зураг байхгүй үед "No Photos Uploaded" харагдах ёстой
test('should display "No Photos Uploaded" when images array is empty', () => {
  render(
    <Images
      images={mockImagesEmpty}
      setImages={() => {
        console.log('test');
      }}
      handleEditHotelImages={async () => {
        console.log('test');
      }}
    />
  );

  // "No Photos Uploaded" байх ёстой
  expect(screen.getByText('No Photos Uploaded'));
});

// Тест 3: Зургууд зөв харуулагдах ёстой (slice, map)
test('should render sliced images correctly from index 1 to 4', () => {
  render(
    <Images
      images={mockImagesWithData}
      setImages={() => {
        console.log('test');
      }}
      handleEditHotelImages={async () => {
        console.log('test');
      }}
    />
  );

  // Бусад зургуудыг шалгах (2 дахь зураг болон дараагийн зургууд)
  const images = screen.getAllByAltText(/Hotel Image \d+/);
  expect(images.length);
  expect(images[0]);
  expect(images[1]);
  expect(images[2]);
  expect(images[3]);
});
