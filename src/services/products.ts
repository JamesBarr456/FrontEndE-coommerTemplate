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
export const deleteProductById = async (
  id: string
): Promise<IProduct | null> => {
  await fakeDelay(150);
  const productToDelete = products.find((p) => p.sku === id) || null;
  products = products.filter((p) => p.sku !== id);
  return productToDelete;
};

// 🔹 ADD new product
export const addProductToApi = async (
  data: Partial<IProduct>
): Promise<IProduct> => {
  await fakeDelay(200);

  const newProduct: IProduct = {
    _id: data._id || "ID-" + Date.now(),
    sku: data.sku || "MOCK-" + Date.now(),
    name: data.name || "Producto por defecto",
    description: data.description || "",
    price: data.price ?? 0,
    size: data.size || [],
    stock: data.stock ?? 0,
    images: data.images || [],
    discount: data.discount ?? 0,
    genre: data.genre || "hombre",
    status: data.status || "active",
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
    brand: data.brand || { name: "Marca por defecto", image: "" },
  };

  products.push(newProduct);
  return newProduct;
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
