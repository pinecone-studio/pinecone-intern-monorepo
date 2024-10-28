"use client";

import { Container, ProductGridCard } from "./assets";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/generated";

export const ProductsGrid = () => {
  const router = useRouter();

  const { data } = useGetProductsQuery();

  const firstProduct = data?.getProducts[0];

  return (
    <Container>
      {firstProduct && (
        <div
          onClick={() => router.push(`/product/${firstProduct._id}`)}
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dqhguhv7o/image/upload/v1725611133/image_1174_vjw7jg.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-[446px] rounded-2xl mb-8 relative cursor-pointer"
        >
          <div className="absolute bottom-8 left-10">
            <p className="text-xl">{firstProduct.name}</p>
            <p className="text-5xl font-bold">
              {firstProduct.price.toLocaleString() + " ₮"}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 grid-rows-6 [&>div:nth-child(7)]:h-[700px] [&>div:nth-child(8)]:h-[700px] [&>div:nth-child(7)]:col-span-2 [&>div:nth-child(7)]:row-span-2 [&>div:nth-child(8)]:col-span-2 [&>div:nth-child(8)]:row-span-2 gap-5">
        {data?.getProducts?.map((product, index) => (
          <ProductGridCard
            key={index}
            id={product._id}
            title={product.name}
            price={product.price}
            images={product.images}
            index={index}
          />
        ))}
      </div>
    </Container>
  );
};
