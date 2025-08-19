import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Truck, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Skeleton } from "@/components/ui/skeleton";

export const PaymentSkeleton = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Proceso de Pago</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="personal"
                className="text-xs md:text-sm flex items-center justify-center"
              >
                <User className="w-4 h-4 mr-2 hidden md:block" />
                Información Personal
              </TabsTrigger>
              <TabsTrigger
                value="envio"
                className="text-xs md:text-sm flex items-center justify-center"
              >
                <Truck className="w-4 h-4 mr-2 hidden md:block" />
                Datos de Envío
              </TabsTrigger>
              <TabsTrigger
                value="pago"
                className="text-xs md:text-sm flex items-center justify-center"
              >
                <CreditCard className="w-4 h-4 mr-2 hidden md:block" />
                Datos de Pago
              </TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <div className="space-y-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};
