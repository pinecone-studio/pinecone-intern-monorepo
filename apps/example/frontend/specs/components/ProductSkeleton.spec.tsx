import ProductSkeleton from '@/components/ProductSkeleton';
import { render, screen } from '@testing-library/react';

describe('Product Skeleton', () => {
  it('бүтэц болон skeletonийг зөв харуулж байгааг шалгах  ', () => {
    render(<ProductSkeleton />);

    const smallSkeletons = screen;
    expect(smallSkeletons);

    const mainImageSkeleton = screen;
    expect(mainImageSkeleton);

    const titleSkeleton = screen;
    expect(titleSkeleton);

    const sizeSkeleton = screen;
    expect(sizeSkeleton);

    const countButton = screen;
    expect(countButton);

    const priceSkeleton = screen;
    expect(priceSkeleton);

    const buttonSkeleton = screen;
    expect(buttonSkeleton);
  });
});
