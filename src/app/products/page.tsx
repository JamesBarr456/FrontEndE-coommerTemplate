import { Filterby } from "@/components/filters/filterby";
import { GridProducts } from "@/components/product/grid-products";
import Orderby from "@/components/filters/orderby";

interface Props {
  searchParams: {
    page?: string;
    genre?: string;
    priceRange?: string;
    size?: string;
  };
}
export default function Products({ searchParams }: Props) {
  return (
    <main className="container font-poppins mx-auto flex flex-col items-center gap-5 my-5">
      <h1 className="text-xl font-bold">Mejores Ofertas</h1>

      <div className="flex w-full gap-7">
        <div className="w-48">
          <Orderby />
        </div>
        <div className="w-48">
          <Filterby />
        </div>
      </div>

      <GridProducts querys={searchParams} />
    </main>
  );
}
