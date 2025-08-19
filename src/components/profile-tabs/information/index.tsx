"use client";

import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ButtonSubmit } from "@/components/others/buttons/button-submit";
import { IUser } from "@/interfaces/users";
import { Input } from "@/components/ui/input";
import { ProfileSkeleton } from "@/components/skeletons/profile-skeleton";
import { profileAction } from "@/actions";
import { profileSchema } from "@/schemas";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";

export const ProfileContent = () => {
  const { user, update } = useAuth();

  if (!user) return <ProfileSkeleton />;
  return (
    <>
      <ProfileForm dataUser={user} update={update} />
    </>
  );
};
interface Props {
  dataUser: IUser;
  update: (dataUser: IUser) => void;
}

const ProfileForm = ({ dataUser, update }: Props) => {
  const [state, formAction] = useFormState(profileAction, null);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: dataUser.first_name || "",
      last_name: dataUser.last_name || "",
      dni: dataUser.dni || "",
      email: dataUser.email || "",
      number_phone: dataUser.number_phone || "",
      avatar: dataUser.avatar || "",
    },
  });

  useEffect(() => {
    if (state?.success) {
      update(state.userData);

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } else if (state?.error) {
      toast({
        title: "Error",
        description: `There was an error updating your profile. Message: ${state?.error}`,
        variant: "destructive",
      });
    }
  }, [state, update]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Manage your profile details here.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form action={formAction}>
          <input type="hidden" name="userId" value={dataUser._id} />
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={form.watch("avatar")} />
                <AvatarFallback>{dataUser.first_name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/avatar.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefóno</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <ButtonSubmit text="Save Change" />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
