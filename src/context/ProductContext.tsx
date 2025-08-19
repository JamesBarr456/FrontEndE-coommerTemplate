"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getProduct, getProductById, getProducts } from "@/services/products";

import { IProduct } from "@/interfaces/product";

interface ProductContextType {
  productItems: IProduct[] | null;
  loading: boolean;

  getProductForName: (name: string) => Promise<void>;
  getProductForId: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [productItems, setProductItems] = useState<IProduct[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const resp = await getProducts();
        setProductItems(resp);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const getProductForName = async (name: string) => {
    try {
      const response = await getProduct(name);
      return response;
    } catch (error) {
      console.error("Error updating item in cart:", error);
    }
  };

  const getProductForId = async (id: string) => {
    try {
      const response = await getProductById(id);
      return response;
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        getProductForId,
        getProductForName,
        productItems,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useCart = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
