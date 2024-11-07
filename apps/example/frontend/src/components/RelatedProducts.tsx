'use client';
import { Container } from '@/components';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetProductByIdQuery, useGetProductsQuery } from '@/generated';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type RelatedProductsProps = {
  id: string;
};
type RelatedProducts = {
  _id: string;
  name: string;
  images: string[];
  price: number;
  category: {
    _id: string;
    name: string;
  };
};

const RelatedProducts = ({ id }: RelatedProductsProps) => {
  const { data: idProductData, loading: idProductLoading } = useGetProductByIdQuery({
    variables: { id },
  });
  const { data: productData, loading: productLoading } = useGetProductsQuery();
  const idProduct = idProductData?.getProductById;
  const products = productData?.getProducts;
  const [relatedProducts, setRelatedProducts] = useState<RelatedProducts[]>([]);

  useEffect(() => {
    if (idProduct && products) {
      const relatedProducts = products.filter((product) => product.category._id === idProduct.category._id && product._id !== idProduct._id);
      setRelatedProducts(relatedProducts);
    }
  }, [idProduct, products]);

  if (productLoading || idProductLoading) {
    return (
      <div className="grid gap-4">
        <Skeleton className="w-40 h-8" />
        <div className="grid grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <div className="relative w-full h-[350px] border rounded-2xl">
                  <Skeleton className="w-full h-full rounded-2xl" />
                </div>
                <div className="px-2 mt-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <Container>
      <div className="grid gap-4" data-testid="related-products">
        <h2 className="font-bold text-2xl">Холбоотой бараа </h2>
        <div className="grid grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
            <Link key={product._id} data-testid={product._id} href={`/products/${product?._id}`}>
              <div>
                <div className="relative w-full h-[350px] border  rounded-2xl">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover rounded-2xl" />
                </div>
                <div className="px-2">
                  <p className="text-xl">{product.name}</p>
                  <p className="text-xl font-bold">{product.price}₮</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default RelatedProducts;
