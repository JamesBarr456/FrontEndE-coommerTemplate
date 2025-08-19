"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ICartItem } from "@/interfaces/cart";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { getAllCartByUserAPI } from "@/services/cart";
import { useAuth } from "@/context/AuthContext";

export const OrdersContent = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<ICartItem[] | []>([]);

  useEffect(() => {
    async function allOrdersUser() {
      try {
        if (user) {
          const orders = await getAllCartByUserAPI(user?._id);
          setOrders(orders);
        }
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }

    allOrdersUser();
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>
          View your past orders and their status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Items</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>
                    {order.updatedAt
                      ? format(new Date(order.updatedAt), "PPpp")
                      : "No disponible"}
                  </TableCell>
                  <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="grid grid-cols-4 gap-1">
                      {order.items.map((item) => (
                        <Image
                          key={item._id}
                          src={item.image}
                          alt={item.name}
                          width={30}
                          height={30}
                          className="rounded"
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                          <DialogTitle>Order Details</DialogTitle>
                          <DialogDescription>
                            Order ID: {order._id}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium">Created At</p>
                              <p className="text-sm text-gray-500">
                                {format(new Date(order.createdAt), "PPpp")}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Updated At</p>
                              <p className="text-sm text-gray-500">
                                {format(new Date(order.updatedAt), "PPpp")}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Status</p>
                              <Badge variant="outline" className="mt-1">
                                {order.status}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm font-medium">User</p>
                              <p className="text-sm text-gray-500">
                                {`${user?.first_name} ${user?.last_name} `}
                              </p>
                            </div>
                          </div>
                          <Separator />
                          <div>
                            <p className="text-sm font-medium mb-2">
                              Order Items
                            </p>
                            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                              {order.items.map((item) => (
                                <div
                                  key={item.productId}
                                  className="flex items-center space-x-4 mb-4"
                                >
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={60}
                                    height={60}
                                    className="rounded-md"
                                  />
                                  <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                      Size: {item.size}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Quantity: {item.quantity}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">
                                      ${item.total_mount.toFixed(2)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      ${item.price.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </ScrollArea>
                          </div>
                          <Separator />
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium">
                                Promo Code Discount
                              </p>
                              <p className="text-sm text-gray-500">
                                {order.promoCodeDiscount}%
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                Total Amount
                              </p>
                              <p className="text-xl font-bold">
                                ${order.total_amount.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
