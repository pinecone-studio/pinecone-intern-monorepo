import ProductImageThumbnails from '@/components/ProductImageThumbnail';
import { fireEvent, render, screen } from '@testing-library/react';

describe(``, () => {
  const mockImages = ['/images/product1.jpg', '/images/product2.jpg', '/images/product3.jpg'];
  const mockSelectedImages = jest.fn();

  const renderComponent = (selectedImage: string | null = null) => {
    render(<ProductImageThumbnails images={mockImages} setSelectedImage={mockSelectedImages} selectedImage={selectedImage} />);
  };

  it('зураг бүрийг зөв гаргаж байгааг шалгах ', () => {
    renderComponent();
    const thumbnails = screen.getAllByRole('img');
    expect(thumbnails);
  });

  it('сонгосон зураг хар өнгийн borderтэй байна уу шалгах , сонгоогүй нь хүрээгүй байна уу шалгах ', () => {
    renderComponent(mockImages[1]);

    const selectedThumbnails = screen.getAllByRole('img')[1];
    expect(selectedThumbnails.parentElement);

    const unSelectedThumbnails = screen.getAllByRole('img').filter((_, index) => index !== 1);
    unSelectedThumbnails.forEach((thumbnail) => {
      expect(thumbnail.parentElement);
    });
  });

  it('зураг дээр дархад зураг солигдож дарагдаж байгааг шалгах ', () => {
    renderComponent();

    const firstThumbnail = screen.getAllByRole('img')[0];
    fireEvent.click(firstThumbnail);
    expect(mockSelectedImages);
  });
});
