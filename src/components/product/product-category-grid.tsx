"use client";

import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { CardProduct } from "./Card";
import { GetAllProductsResponse } from "@/interfaces/product";
import { GridProductsSkeleton } from "../skeletons/grid-products-skeleton";
import Link from "next/link";
import Loading from "../others/Loading";
import { getProducts } from "@/services/products";

type QueryParams = {
  [key: string]: string;
};

interface ProductCategoryGridProps {
  title: string;
  query: QueryParams;
}

export const ProductCategoryGrid = ({
  title,
  query,
}: ProductCategoryGridProps) => {
  const [products, setProducts] = useState<GetAllProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts(query);
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query]);

  if (loading) return <GridProductsSkeleton />;

  if (!products || products.products.length === 0) return <Loading />;

  return (
    <section className="flex flex-col items-center px-3 gap-6 w-full">
      <h2 className="text-3xl  uppercase font-semibold text-orange-400">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 w-full ">
        {products.products.map((product, i) => (
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

      <Button
        asChild
        className="bg-orange-500  p-7 rounded-xl hover:bg-orange-600 text-white transition-colors"
      >
        <Link href="/products">Ver más productos</Link>
      </Button>
    </section>
  );
};
