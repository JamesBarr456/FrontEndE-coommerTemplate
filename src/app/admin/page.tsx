import { Package, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProductContent } from "@/components/admin-tabs/products-tab/product-content";
import { UserContent } from "@/components/admin-tabs/users-tab/usert-content";

interface Props {
  searchParams: {
    page?: string;
  };
}
export default function Admin({ searchParams }: Props) {
  return (
    <div className="container  mx-auto p-4 font-poppins">
      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">
            <Package className="mr-2 h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-10 space-y-5">
          <ProductContent querys={searchParams} />
        </TabsContent>

        <TabsContent value="users" className="mt-10">
          <UserContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
