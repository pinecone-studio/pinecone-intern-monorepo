'use client';

import { Container } from '@/components';
import { useGetProductByIdQuery } from '@/generated';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoHeart } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import ProductImageThumbnails, { ImageViewerProps } from '@/components/ProductImageThumbnail';
import SizeSelector from '@/components/SizeSelector';
import QuantityControl from '@/components/QuantityControl';
import ProductSkeleton from '@/components/ProductSkeleton';
import ProductEvulation from './ProductEvulation';

type ProductDetailsProps = {
  id: string;
};

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  category: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface ProductInfoProps {
  productDetails: Product;
  selectedSize: string | null;
  setSelectedSize: (_size: string) => void;
  count: number;
  setCount: (_count: number) => void;
  evulation: boolean;
  setEvulation: (_evulation: boolean) => void;
}
interface EvaluationToggleProps {
  evulation: boolean;
  setEvulation: (_evulation: boolean) => void;
}

const ProductDetails = ({ id }: ProductDetailsProps) => {
  const { data, loading, error } = useGetProductByIdQuery({ variables: { id } });
  const productDetails = data?.getProductById;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [count, setCount] = useState(1);
  const [evulation, setEvulation] = useState(false);

  useEffect(() => {
    if (productDetails?.images) {
      setSelectedImage(productDetails.images[0]);
      setSelectedSize('S');
    }
  }, [productDetails]);

  if (loading) return <ProductSkeleton />;
  if (error) return <div>Error loading product details.</div>;

  return (
    <Container data-testid="product-details">
      {productDetails ? (
        <div className="flex gap-3 items-center">
          <ImageViewer images={productDetails.images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
          <ProductInfo
            productDetails={productDetails as Product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            count={count}
            setCount={setCount}
            evulation={evulation}
            setEvulation={setEvulation}
          />
        </div>
      ) : (
        <div>Product not found.</div>
      )}
    </Container>
  );
};

const ImageViewer = ({ images, selectedImage, setSelectedImage }: ImageViewerProps) => (
  <div className="flex gap-3">
    <ProductImageThumbnails images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
    <div className="w-[430px] h-[640px] mb-8 sticky rounded-2xl border">{selectedImage && <Image src={selectedImage} alt="Selected Product Image" fill className="rounded-2xl object-cover" />}</div>
  </div>
);

const ProductInfo = ({ productDetails, selectedSize, setSelectedSize, count, setCount, evulation, setEvulation }: ProductInfoProps) => (
  <div className="grid gap-4">
    <p className="border w-fit h-fit border-[#2563EB] px-2 rounded-xl items-center my-2 font-semibold text-[12px]">шинэ</p>
    <h1 className="font-bold text-2xl flex gap-2">
      {productDetails.name} <IoHeart />
    </h1>
    <p>{productDetails.description}</p>
    <SizeSelector selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
    <QuantityControl count={count} setCount={setCount} />
    <p className="font-bold text-xl">{productDetails.price}₮</p>
    <Button className="w-fit rounded-full">Сагсанд нэмэх</Button>
    <EvaluationToggle evulation={evulation} setEvulation={setEvulation} />
    {evulation && <ProductEvulation />}
  </div>
);

const EvaluationToggle = ({ evulation, setEvulation }: EvaluationToggleProps) => (
  <div className="flex gap-2">
    <p>Үнэлгээ</p>
    <p className="underline underline-offset-4 text-blue-600 cursor-pointer" onClick={() => setEvulation(!evulation)}>
      {evulation ? 'бүгдийг хураах' : 'бүгдийг харах'}
    </p>
  </div>
);

export default ProductDetails;
