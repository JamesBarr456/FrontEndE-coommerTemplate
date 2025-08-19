"use client";

import { ICartItem, IItems } from "@/interfaces/cart";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addToCart,
  getCartItems,
  removeItem,
  updateCart,
} from "@/services/cart";

import { useAuth } from "./AuthContext";

interface CartContextType {
  cartItems: ICartItem | null;
  loading: boolean;
  addItemToCart: (data: {
    userId: string;
    productId: string;
    quantity: number;
    size: number;
  }) => Promise<void>;
  updateItemInCart: (userId: string, data: Partial<IItems>) => Promise<void>;
  removeItemFromCart: (userId: string, itemId: string) => Promise<void>;
  updateStatusCart: (
    userId: string,
    status: "active" | "completed"
  ) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<ICartItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCart() {
      try {
        if (user) {
          setLoading(true);
          const resp = await getCartItems(user._id);
          setCartItems(resp);
          setLoading(false);
        } else {
          setCartItems(null);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setLoading(false);
      }
    }
    fetchCart();
  }, [user]);

  const addItemToCart = async (data: {
    userId: string;
    productId: string;
    quantity: number;
    size: number;
  }) => {
    try {
      const response = await addToCart(data);
      setCartItems(response);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const updateItemInCart = async (userId: string, data: Partial<IItems>) => {
    try {
      if (cartItems) {
        const response = await updateCart(userId, cartItems._id, data);
        setCartItems(response);
      }
    } catch (error) {
      console.error("Error updating item in cart:", error);
    }
  };
  const updateStatusCart = async (
    userId: string,
    status: "active" | "completed"
  ) => {
    try {
      if (cartItems) {
        await updateCart(userId, cartItems._id, {}); //falta el status
        setCartItems(null);
      }
    } catch (error) {
      console.error("Error updating item in cart:", error);
    }
  };

  const removeItemFromCart = async (userId: string, itemId: string) => {
    console.log(userId, itemId);
    try {
      const response = await removeItem(userId, itemId);
      setCartItems(response);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addItemToCart,
        updateItemInCart,
        removeItemFromCart,
        updateStatusCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
