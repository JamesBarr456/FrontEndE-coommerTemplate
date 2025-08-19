"use client";

import * as z from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
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
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { securityAction } from "@/actions";
import { seguritySchema } from "@/schemas";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";

export const SecurityContent = () => {
  const [state, formAction] = useFormState(securityAction, null);

  const { updatePassword, user } = useAuth();

  const form = useForm<z.infer<typeof seguritySchema>>({
    resolver: zodResolver(seguritySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (state?.success) {
      updatePassword(state.userData);
      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      });
    }
  }, [state, updatePassword]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Manage your account security here.</CardDescription>
      </CardHeader>
      <CardContent>
        {state?.error && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form action={formAction} className="space-y-8 mt-5">
            <input type="hidden" name="userId" value={user?._id} />
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ButtonSubmit text="Change Password" />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
