"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sortingOptions = [
  { key: "price_descending", label: "Precio: Mayor a Menor" },
  { key: "price_ascending", label: "Precio: Menor a Mayor" },
  { key: "alpha_ascending", label: "A-Z" },
  { key: "alpha_descending", label: "Z-A" },
  { key: "created_descending", label: "Más Nuevo al más Viejo" },
  { key: "created_ascending", label: "Más Viejo al más Nuevo" },
];

function SortingSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("sort_by", value);

    router.push(`${pathname}?${params.toString()}`);
  };

  const selectedSort = searchParams.get("sort_by") || "";

  return (
    <Select onValueChange={handleValueChange} defaultValue={selectedSort}>
      <SelectTrigger className="w-full rounded-xl border-none shadow-md font-poppins">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent className="bg-white rounded-xl font-poppins">
        <SelectGroup>
          <SelectLabel>Opciones de ordenamiento</SelectLabel>
          {sortingOptions.map((option) => (
            <SelectItem
              className="cursor-pointer"
              key={option.key}
              value={option.key}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function Orderby() {
  return <SortingSelect />;
}
