import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <>
      <main className="flex h-screen w-full flex-col items-center justify-center  bg-slate-100 font-poppins">
        <div className="relative ">
          <h1 className="text-9xl font-extrabold tracking-widest text-orange-300">
            404
          </h1>
          <div className="absolute right-[28%] top-1/2 rotate-12 rounded bg-[#FF6A3D] px-4 text-sm text-white">
            Page Not Found
          </div>
        </div>
        <p className="mb-6 text-xl font-semibold text-center text-blue-950">
          El producto o la página que estás buscando no existe.
        </p>
        <Button
          asChild
          className="bg-orange-500  mt-6 w-40 p-7 rounded-xl hover:bg-orange-600 text-white transition-colors"
        >
          <Link href="/">Go Home</Link>
        </Button>
      </main>
    </>
  );
}
