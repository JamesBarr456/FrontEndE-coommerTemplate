import { ICartItem, IItems } from "@/interfaces/cart";

import { getProductById } from "./products";

const CART_KEY = "user_carts";

// Funciones auxiliares
const getAllCartsFromStorage = (): ICartItem[] => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

const saveAllCartsToStorage = (carts: ICartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(carts));
};

const calculateTotalAmount = (items: IItems[]): number => {
  return items.reduce((sum, item) => sum + item.total_mount, 0);
};

// Obtener carrito activo de un usuario
const getUserActiveCart = (userId: string): ICartItem => {
  const carts = getAllCartsFromStorage();
  let userCart = carts.find(
    (c) => c.userId === userId && c.status === "active"
  );

  if (!userCart) {
    const now = new Date();
    userCart = {
      _id: crypto.randomUUID(),
      userId,
      items: [],
      total_amount: 0,
      promoCodeDiscount: 0,
      status: "active",
      createdAt: now,
      updatedAt: now,
    };
    carts.push(userCart);
    saveAllCartsToStorage(carts);
  }

  return userCart;
};

export const addToCart = async (data: {
  userId: string;
  productId: string;
  quantity: number;
  size: number;
}) => {
  try {
    if (data.quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

    // Traer todos los carritos y el carrito del usuario
    const carts = getAllCartsFromStorage();
    let userCart = getUserActiveCart(data.userId);

    // Si no existe un carrito para el usuario, crear uno
    if (!userCart) {
      userCart = {
        _id: crypto.randomUUID(),
        userId: data.userId,
        items: [],
        total_amount: 0,
        status: "active",
        promoCodeDiscount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      carts.push(userCart);
    }

    // Obtener información del producto
    const productInfo = await getProductById(data.productId);
    if (!productInfo) throw new Error("Product not found");

    // Buscar item existente con mismo producto y mismo tamaño
    const existingItemIndex = userCart.items.findIndex(
      (item) => item.productId === data.productId && item.size === data.size
    );

    if (existingItemIndex !== -1) {
      // Actualizar item existente
      userCart.items[existingItemIndex].quantity += data.quantity;
      userCart.items[existingItemIndex].total_mount =
        userCart.items[existingItemIndex].quantity *
        userCart.items[existingItemIndex].price;
    } else {
      // Agregar nuevo item
      userCart.items.push({
        _id: crypto.randomUUID(),
        productId: productInfo._id,
        name: productInfo.name,
        image: productInfo.images[0],
        quantity: data.quantity,
        size: data.size,
        price: productInfo.price,
        sku: productInfo.sku,
        total_mount: data.quantity * productInfo.price,
      });
    }

    // Recalcular total del carrito
    userCart.total_amount = calculateTotalAmount(userCart.items);
    userCart.updatedAt = new Date();

    // Actualizar el carrito dentro del array de todos los carritos
    const cartIndex = carts.findIndex((cart) => cart.userId === data.userId);
    if (cartIndex !== -1) {
      carts[cartIndex] = userCart;
    } else {
      carts.push(userCart);
    }

    // Guardar cambios
    saveAllCartsToStorage(carts);

    return userCart;
  } catch (error) {
    console.error("Error in addToCart:", error);
    throw error;
  }
};

export const removeItem = async (
  userId: string,
  itemId: string
): Promise<ICartItem> => {
  const carts = getAllCartsFromStorage();
  const userCart = getUserActiveCart(userId);

  // Filtrar el item
  userCart.items = userCart.items.filter((item) =>
    item._id === itemId ? false : true
  );
  userCart.total_amount = calculateTotalAmount(userCart.items);
  userCart.updatedAt = new Date();

  // Reemplazar carrito actualizado en el array
  const cartIndex = carts.findIndex(
    (cart) => cart.userId === userCart.userId && cart.status === "active"
  );
  if (cartIndex !== -1) {
    carts[cartIndex] = userCart;
  } else {
    carts.push(userCart);
  }

  saveAllCartsToStorage(carts);

  return userCart;
};

// Obtener items del carrito
export const getCartItems = async (userId: string) => {
  const userCart = getUserActiveCart(userId);
  return userCart;
};

export const updateCart = async (
  userId: string,
  itemId: string,
  data: Partial<IItems>
): Promise<ICartItem> => {
  try {
    const carts = getAllCartsFromStorage();
    const userCart = getUserActiveCart(userId);

    if (!userCart) throw new Error("Cart not found");

    // Buscar índice del item a actualizar
    const index = userCart.items.findIndex((item) => item._id === data._id);
    if (index === -1) throw new Error("Item not found");

    // Actualizar el item
    userCart.items[index] = {
      ...userCart.items[index],
      ...data,
      total_mount:
        (data.quantity ?? userCart.items[index].quantity) *
        (data.price ?? userCart.items[index].price),
    };

    // Recalcular total del carrito
    userCart.total_amount = calculateTotalAmount(userCart.items);
    userCart.updatedAt = new Date();

    // Reemplazar carrito actualizado en el array de todos los carritos
    const cartIndex = carts.findIndex(
      (cart) => cart.userId === userCart.userId && cart.status === "active"
    );
    if (cartIndex !== -1) {
      carts[cartIndex] = userCart;
    } else {
      carts.push(userCart);
    }

    // Guardar cambios
    saveAllCartsToStorage(carts);

    return userCart;
  } catch (error) {
    console.error("Error in updateCart:", error);
    throw error;
  }
};

// Aplicar descuento promocional
export const updateDiscountPromo = async (userId: string, discount: number) => {
  const carts = getAllCartsFromStorage();
  const userCart = getUserActiveCart(userId);

  userCart.promoCodeDiscount = discount;
  userCart.updatedAt = new Date();
  saveAllCartsToStorage(carts);

  return userCart;
};

// Obtener todos los carritos de un usuario
export const getAllCartByUser = async (userId: string) => {
  const carts = getAllCartsFromStorage();
  return carts.filter((c) => c.userId === userId);
};
