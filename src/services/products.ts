import { GetAllProductsResponse, IProduct } from "@/interfaces/product";

import { productMock } from "@/const/product/product-mock";

interface QueryParams {
  genre?: string;
  sort?: string;
  priceRange?: string;
  size?: string;
  page?: string;
}

// vamos a trabajar con una copia para poder mutar sin dañar el archivo original
let products: IProduct[] = [...productMock];

// Simula delay de red
const fakeDelay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// 🔹 GET all
export const getProducts = async (
  queryParams?: QueryParams
): Promise<GetAllProductsResponse> => {
  await fakeDelay(200);

  let results = [...products];

  if (queryParams?.genre) {
    results = results.filter((p) => p.genre === queryParams.genre);
  }

  if (queryParams?.size) {
    results = results.filter((p) =>
      p.size.includes(queryParams.size as string)
    );
  }

  if (queryParams?.sort === "price-asc") {
    results = results.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (queryParams?.sort === "price-desc") {
    results = results.sort((a, b) => Number(b.price) - Number(a.price));
  }

  const totalProducts = results.length;
  const totalPages = 1; // Si no tienes paginación real, puedes dejar 1

  return {
    products: results,
    totalProducts,
    totalPages,
  };
};
// 🔹 GET by name
export const getProduct = async (
  name: string
): Promise<IProduct | undefined> => {
  await fakeDelay(150);
  return products.find((p) => p.name === name);
};

// 🔹 GET by ID (sku)
export const getProductById = async (
  id: string
): Promise<IProduct | undefined> => {
  await fakeDelay(150);
  return products.find((p) => p._id === id);
};

// 🔹 DELETE by ID
export const deleteProductById = async (id: string): Promise<IProduct[]> => {
  await fakeDelay(150);
  products = products.filter((p) => p.sku !== id);
  return products;
};

// 🔹 ADD new product
export const addProductToApi = async (data: IProduct): Promise<IProduct> => {
  await fakeDelay(200);

  // si no tiene SKU, inventamos uno
  if (!data.sku) {
    data.sku = "MOCK-" + Date.now();
  }

  products.push(data);
  return data;
};

// 🔹 UPDATE product
export const putProductToApi = async (
  id: string,
  data: Partial<IProduct>
): Promise<IProduct | null> => {
  await fakeDelay(200);

  const index = products.findIndex((p) => p.sku === id);
  if (index === -1) return null;

  products[index] = { ...products[index], ...data };
  return products[index];
};
