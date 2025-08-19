import { Heart, Lock, ShoppingBag, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { OrdersContent } from "@/components/profile-tabs/orders";
import { ProfileContent } from "@/components/profile-tabs/information";
import { SecurityContent } from "@/components/profile-tabs/security";
import { WishListContent } from "@/components/profile-tabs/wishlist";

export default function UserProfile() {
  return (
    <div className="container mx-auto p-4 font-poppins">
      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="wishlist">
            <Heart className="mr-2 h-4 w-4" />
            Wishlist
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileContent />
        </TabsContent>
        <TabsContent value="orders">
          <OrdersContent />
        </TabsContent>
        <TabsContent value="security">
          <SecurityContent />
        </TabsContent>
        <TabsContent value="wishlist">
          <WishListContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
