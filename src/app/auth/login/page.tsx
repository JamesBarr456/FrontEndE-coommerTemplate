"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormState, useFormStatus } from "react-dom";

import { Asterisk } from "lucide-react";
import { ButtonSubmit } from "@/components/others/buttons/button-submit";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginAction } from "@/actions";
import { loginSchema } from "@/schemas";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginData = z.infer<typeof loginSchema>;

export default function RegistrationForm() {
  const { login } = useAuth();
  const [state, formAction] = useFormState(loginAction, null);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state?.success) {
      login(state.token, state.userData);
    }
  }, [state, login]);

  return (
    <Form {...form}>
      <form
        action={formAction}
        className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md my-12"
      >
        {state?.error && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        <h2 className="text-2xl font-bold mb-6 text-center">
          Inicio de Sesión
        </h2>

        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Correo electrónico{" "}
                <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Contraseña <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonSubmit text="Iniciar Sesión" />
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?
          <Link
            href="register"
            className="mx-4 font-medium text-primary hover:underline"
            prefetch={false}
          >
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
}
