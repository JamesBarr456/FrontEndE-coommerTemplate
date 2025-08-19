"use client";

import { Asterisk, CircleX, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { IProduct } from "@/interfaces/product";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { addProductAction } from "@/actions";
import { productSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  initData?: IProduct;
  onCreate?: (data: Partial<IProduct>) => void;
  onUpdate?: (id: string, data: Partial<IProduct>) => void;
}
export const ProductForm = ({ initData, onUpdate, onCreate }: Props) => {
  const [images, setImages] = useState<string[]>(initData?.images || []);
  const [sizes, setSizes] = useState<number[]>(initData?.size || []);
  const [state, formAction] = useFormState(addProductAction, null);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initData?.name || "",
      genre: initData?.genre || "hombre",
      discount: initData?.discount.toString() || "0",
      imageUrl: "",
      price: initData?.price.toString() || "0",
      brand: initData?.brand || { name: "", image: "" },
      description: initData?.description || "",
      sku: initData?.sku || "",
      size: "",
      stock: initData?.stock.toString() || "0",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (state?.success) {
      if (!initData) {
        form.reset();
        setImages([]);
        setSizes([]);
      }
    }
  }, [state, form, initData]);

  const handleAddImage = () => {
    const imageUrl = form.getValues("imageUrl");
    if (imageUrl) {
      setImages([...images, imageUrl]);
      form.setValue("imageUrl", "");
    }
  };

  const handleAddSize = () => {
    const size = form.getValues("size");
    if (size) {
      setSizes([...sizes, +size]);
      form.setValue("size", "");
    }
  };

  const handleRemoveSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  return (
    <ScrollArea>
      <Form {...form}>
        <form action={formAction} className="space-y-4 font-poppins p-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1">
                  Name <Asterisk size={16} className="text-red-500" />
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1">Genre</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hombre">Hombre</SelectItem>
                    <SelectItem value="mujer">Mujer</SelectItem>
                    <SelectItem value="kids">Kids</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1">
                  Brand Name <Asterisk size={16} className="text-red-500" />
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand.image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1">
                  Brand URL <Asterisk size={16} className="text-red-500" />
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1">
                  Description <Asterisk size={16} className="text-red-500" />
                </FormLabel>
                <FormControl>
                  <Textarea className="h-36" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1">
                  Price <Asterisk size={16} className="text-red-500" />
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1">Discount</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1">
                  Stock <Asterisk size={16} className="text-red-500" />
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="flex gap-1">
                  SKU <Asterisk size={16} className="text-red-500" />
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
                <FormLabel className="text-xs text-gray-400">
                  &#34;El SKU se genera tomando la abreviatura de la marca,
                  seguido del modelo, y luego los colores. Por ejemplo, para la
                  marca &#39;Adidas&#39;, el modelo &#39;Neo 10K&#39;, y el
                  color &#39;Pink&#39;, el SKU sería: AD-NEO10K-PNK.&#34;
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1">
                  Size <Asterisk size={16} className="text-red-500" />
                </FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input {...field} />
                    <Button type="button" onClick={handleAddSize}>
                      Add Size
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {sizes.length > 0 && (
            <div>
              <FormLabel>Added Sizes:</FormLabel>
              <ul className=" pl-5 space-y-5">
                {sizes.map((size, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <p>{size}</p>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveSize(index)}
                      className="transition-colors hover:bg-red-500 hover:text-white hover:border-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1">
                  Image URL
                  <Asterisk size={16} className="text-red-500" />
                </FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input {...field} />
                    <Button type="button" onClick={handleAddImage}>
                      Add
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {images.length > 0 && (
            <div>
              <FormLabel>Added Images:</FormLabel>
              <ul className=" pl-5 space-y-4">
                {images.map((url, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Image
                      src={url}
                      alt={`thumbdail ${index + 1}`}
                      width={50}
                      height={50}
                      className="rounded-md  h-auto w-auto object-contain object-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveImage(index)}
                      className="transition-colors hover:bg-red-500 hover:text-white hover:border-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button type="submit" className="w-full">
            Save Product
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};
