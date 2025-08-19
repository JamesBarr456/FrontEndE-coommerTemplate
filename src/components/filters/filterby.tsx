"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loading from "../others/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";

const dataFilter = {
  sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
  genres: ["hombre", "mujer", "kids"],
};

export const Filterby = () => {
  const { genres, sizes } = dataFilter;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [loadingApply, setLoadingApply] = useState(false);
  const [loadingClear, setLoadingClear] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const genreFromUrl = searchParams.get("genre") || "";
    const sizeFromUrl = searchParams.get("size") || "";
    const priceFromUrl = searchParams
      .get("priceRange")
      ?.split("-")
      .map((val) => (isNaN(Number(val)) ? 0 : Number(val))) || [0, 200000];

    setSelectedGenre(genreFromUrl);
    setSelectedSize(sizeFromUrl);
    setPriceRange(priceFromUrl);
  }, [searchParams]);

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value);
  };

  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const applyFilters = () => {
    setLoadingApply(true);

    setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (selectedGenre) params.set("genre", selectedGenre);
      else params.delete("genre");

      if (selectedSize) params.set("size", selectedSize);
      else params.delete("size");

      if (priceRange[0] !== 0 || priceRange[1] !== 200000) {
        params.set("priceRange", priceRange.join("-"));
      } else {
        params.delete("priceRange");
      }
      router.push(`?${params.toString()}`);

      setLoadingApply(false);
      setIsSheetOpen(false);
    }, 1000);
  };

  const clearFilters = () => {
    setLoadingClear(true);
    setTimeout(() => {
      setSelectedGenre("");
      setSelectedSize("");
      setPriceRange([0, 200000]);
      router.push("/products");
      router.refresh();
      setLoadingClear(false);
      setIsSheetOpen(false);
    }, 1000);
  };

  const isAnyFilterSelected =
    selectedGenre !== "" ||
    selectedSize !== "" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 200000;

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button
          asChild
          className="w-full rounded-xl cursor-pointer shadow-md font-poppins"
        >
          <div>
            <p className="mx-3">Filtrar por:</p>
            <SlidersHorizontal size={20} />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <Accordion type="single" collapsible className="w-full font-poppins">
          <AccordionItem value="item-1">
            <AccordionTrigger>Genero</AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                onValueChange={handleGenreChange}
                value={selectedGenre}
              >
                {genres.map((genre, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem value={genre} id={genre} />
                    <Label
                      htmlFor={genre}
                      className="text-sm capitalize font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {genre}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Talle</AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-36 w-full">
                <RadioGroup
                  onValueChange={handleSizeChange}
                  value={selectedSize}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {sizes.map((size, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={size.toString()}
                          id={`size-${size}`}
                        />
                        <Label
                          htmlFor={`size-${size}`}
                          className="text-sm capitalize font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Gama de Precios</AccordionTrigger>
            <AccordionContent>
              <div className="w-full max-w-sm space-y-4">
                <h2 className="text-lg font-semibold">Rango de Precios</h2>
                <Slider
                  max={200000}
                  min={0}
                  step={10}
                  minStepsBetweenThumbs={1}
                  onValueChange={handlePriceChange}
                  value={priceRange}
                />
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Mínimo: ${priceRange[0]}
                  </span>
                  <span className="text-sm font-medium">
                    Máximo: ${priceRange[1]}
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <SheetFooter className="gap-3 mt-10 font-poppins">
          <Button
            variant="outline"
            onClick={applyFilters}
            disabled={!isAnyFilterSelected}
          >
            {loadingApply ? <Loading /> : "Aplicar Filtros"}
          </Button>
          <Button
            variant="outline"
            onClick={clearFilters}
            disabled={!isAnyFilterSelected}
          >
            {loadingClear ? <Loading /> : "Limpiar Filtros"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
