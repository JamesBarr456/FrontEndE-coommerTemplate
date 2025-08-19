import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { IProduct } from "@/interfaces/product";
import Image from "next/image";
import NotFound from "../not-found";
import { SizeSelector } from "@/components/product/size-selector";
import { getProduct } from "@/services/products";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Detail({ params }: Props) {
  let { slug } = params;
  slug = decodeURIComponent(slug);

  const product: IProduct = await getProduct(slug);

  if (!product) return <NotFound />;

  const { discount, images, price, brand, name, sku, description } = product;

  const newPrice = discount > 0 ? price * (1 - discount / 100) : price;

  return (
    <main className="container font-poppins grid grid-cols-1 md:grid-cols-2 justify-items-center md:items-center p-5 gap-5">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full px-5 max-w-sm"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="w-full">
              <div className="relative h-72 w-full">
                <Image
                  src={image}
                  alt={`product image`}
                  fill
                  sizes="(min-width: 768px) 40vw, 70vw"
                  className="object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-2" />
        <CarouselNext className="-right-2" />
      </Carousel>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between w-full ">
          <div className="relative h-14 w-14">
            <Image
              src={brand.image}
              alt={`${name} logo`}
              fill
              sizes="(min-width: 768px) 40vw, 70vw"
              className="object-contain"
            />
          </div>
          <Button
            variant="ghost"
            className=" rounded-full p-2  h-10 hover:bg-orange-50 hover:text-orange-500"
          >
            <Heart />
          </Button>
        </div>
        <h1 className="font-bold text-orange-500 text-2xl">{name}</h1>
        <p className="text-xs">SKU: {sku}</p>
        <p className="text-blue-grayish-dark">{description}</p>

        <div className="font-bold flex justify-between lg:flex-col lg:gap-5">
          <p className="text-3xl flex items-center gap-4">
            ${newPrice.toLocaleString()}
            {discount > 0 && (
              <span className="bg-orange-50 text-base text-orange-500 px-2 py-1 rounded-xl">
                {discount}%
              </span>
            )}
          </p>

          {discount > 0 && (
            <p className="text-gray-400 font-bold line-through">
              ${price.toLocaleString()}
            </p>
          )}
        </div>

        <SizeSelector product={product} />
      </div>
    </main>
  );
}
