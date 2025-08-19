"use client";

import { useEffect, useState } from "react";

import { CardProduct } from "./card";
import { GetAllProductsResponse } from "@/interfaces/product";
import { GridProductsSkeleton } from "../skeletons/grid-products-skeleton";
import { Paginations } from "../pagination/pagination";
import { getProducts } from "@/services/products";

interface Props {
  querys: {
    page?: string;
    genre?: string;
    priceRange?: string;
    size?: string;
  };
}

export const GridProducts = ({ querys }: Props) => {
  const [products, setProducts] = useState<GetAllProductsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProductsApi = async () => {
      setLoading(true);
      try {
        const response = await getProducts(querys);
        setProducts(response);
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getProductsApi();
  }, [querys]);

  if (loading) {
    return <GridProductsSkeleton />;
  }

  return (
    <>
      <section className="flex flex-col px-3 gap-6 w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 ">
          {products?.products.map((product, i) => (
            <CardProduct
              key={i}
              discount={product.discount}
              img={product.images[0]}
              logo={product.brand.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
        <Paginations totalPages={products?.totalPages || 1} />
      </section>
    </>
  );
};
