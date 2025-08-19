export interface IItems {
  _id: string;
  productId: string;
  name: string;
  image: string;
  quantity: number;
  size: number;
  price: number;
  sku: string;
  total_mount: number;
}

export interface ICartItem {
  _id: string;
  userId: string;
  items: IItems[];
  total_amount: number;
  promoCodeDiscount: number;
  status: string;
  updatedAt: Date;
  createdAt: Date;
}
