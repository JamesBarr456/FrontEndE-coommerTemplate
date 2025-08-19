"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  UserCircle,
  UserRoundCheck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { useAuth } from "@/context/AuthContext";

export function UserButton() {
  const { logout, user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    logout();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size={"icon"}
          variant="ghost"
          className="  rounded-full hover:bg-orange-50 hover:text-orange-500"
        >
          {isLoading ? (
            <Skeleton className="h-7 w-7 rounded-full" />
          ) : isAuthenticated && user ? (
            user.avatar && user.avatar.trim() !== "" ? (
              <Avatar className="h-7 w-7 relative">
                <AvatarImage src={user.avatar} alt={user.first_name} />
              </Avatar>
            ) : (
              <div className="relative">
                <UserRoundCheck size={27} />
              </div>
            )
          ) : (
            <CircleUserRound size={27} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 font-poppins" align="end" forceMount>
        {isAuthenticated ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center">
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user && user.status === "admin" && (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuItem
              onClick={handleSignOut}
              className="flex items-center text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/auth/login" className="flex items-center">
              <span>Iniciar sesión</span>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
