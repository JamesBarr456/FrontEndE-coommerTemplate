"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GetAllProductsResponse, IProduct } from "@/interfaces/product";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  addProductToApi,
  deleteProductById,
  getProducts,
  putProductToApi,
} from "@/services/products";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Loading from "@/components/others/loading";
import { Paginations } from "@/components/pagination/pagination";
import { ProductForm } from "./product-form";

interface Props {
  querys: {
    page?: string;
  };
}

export const ProductContent = ({ querys }: Props) => {
  const [products, setProducts] = useState<GetAllProductsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProductsApi = async () => {
      setLoading(true);
      try {
        const response = await getProducts(querys);
        setProducts(response);
      } catch (error) {
        throw new Error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    getProductsApi();
  }, [querys]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );

  if (!products) throw new Error("Products not found");

  const handleDeleteProduct = async (id: string) => {
    const resp: IProduct = await deleteProductById(id);
    setProducts(
      (prevState) =>
        prevState && {
          ...prevState,
          products: prevState.products.filter(
            (product) => product._id !== resp._id
          ),
        }
    );
  };
  const handleCreateProduct = async (data: Partial<IProduct>) => {
    await addProductToApi(data);
  };

  const handleUpdateProduct = async (id: string, data: Partial<IProduct>) => {
    await putProductToApi(id, data);
  };

  return (
    <>
      <div className="mt-4 flex justify-end items-center font-poppins">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-auto h-3/4">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription />
            </DialogHeader>

            <ProductForm onCreate={handleCreateProduct} />
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea className="h-[400px] w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.genre}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.discount}%</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <TooltipProvider>
                      <Dialog>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Product</p>
                          </TooltipContent>
                        </Tooltip>

                        <DialogContent className="overflow-auto h-3/4">
                          <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                            <DialogDescription />
                          </DialogHeader>
                          <ProductForm
                            onUpdate={handleUpdateProduct}
                            initData={product}
                          />
                        </DialogContent>
                      </Dialog>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Product</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Paginations totalPages={products.totalPages} />
    </>
  );
};
