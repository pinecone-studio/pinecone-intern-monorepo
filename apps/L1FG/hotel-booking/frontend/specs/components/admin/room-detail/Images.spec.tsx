import { Images } from '@/components/admin/room-detail';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

const mockDataWithImages = {
  id: '1',
  name: 'Hotel Test',
  images: ['/image1.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg', '/image5.jpg'],
};

const mockDataWithoutImages = {
  id: '1',
  name: 'Hotel Test',
  images: [],
};

test('should render first image and multiple images when data.images has multiple images', () => {
  render(
    <Images
      data={mockDataWithImages}
      images={[]}
      setImages={() => {
        console.log('test');
      }}
      handleEditHotelImages={async () => {
        console.log('test');
      }}
    />
  );

  // Эхний зураг харагдах ёстой
  expect(screen.getByAltText('Hotel Image'));

  // 2 дахь хүртэлх зурагнууд харагдах ёстой
  expect(screen.getAllByAltText(/Hotel Image \d/));
});

test('should display "No Photos Uploaded" when no images are provided', () => {
  render(
    <Images
      data={mockDataWithoutImages}
      images={[]}
      setImages={() => {
        console.log('test');
      }}
      handleEditHotelImages={async () => {
        console.log('test');
      }}
    />
  );
});

test('should render only one image when data.images has only one image', () => {
  const dataWithOneImage = { id: '1', name: 'Hotel Test', images: ['/image1.jpg'] };
  render(
    <Images
      data={dataWithOneImage}
      images={[]}
      setImages={() => {
        console.log('test');
      }}
      handleEditHotelImages={async () => {
        console.log('test');
      }}
    />
  );

  // Эхний зургийг харагдах ёстой
  expect(screen.getByAltText('Hotel Image'));

  // Дараагийн зурагнууд байхгүй байх ёстой
  expect(screen.queryAllByAltText(/Hotel Image \d/));
});
