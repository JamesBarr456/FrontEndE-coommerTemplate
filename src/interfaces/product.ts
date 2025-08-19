interface Brand {
  name: string;
  image: string;
}
type Genre = "hombre" | "mujer" | "kids";

export interface IProduct {
  _id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  size: string[];
  stock: number;
  images: string[];
  discount: number;
  genre: Genre;
  status: string;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
}

export interface GetAllProductsResponse {
  products: IProduct[];
  totalPages: number;
  totalProducts: number;
}
