'use client';
import { Container } from '@/components';
import ProductDetails from '@/components/ProductDetails';
import RelatedProducts from '@/components/RelatedProducts';
import { useParams } from 'next/navigation';

const Page = () => {
  const { id } = useParams();
  return (
    <Container>
      <div>
        <ProductDetails id={id as string} />
        <RelatedProducts id={id as string} />
      </div>
    </Container>
  );
};

export default Page;
