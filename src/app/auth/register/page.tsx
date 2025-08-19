"use client";

import * as z from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Asterisk } from "lucide-react";
import { ButtonSubmit } from "@/components/others/buttons/button-submit";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { registerAction } from "@/actions";
import { registerSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

type registerData = z.infer<typeof registerSchema>;

export default function RegistrationForm() {
  const [state, formAction] = useFormState(registerAction, null);
  const router = useRouter();
  const form = useForm<registerData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      dni: "",
      number_phone: { areaCode: "", number: "" },
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  if (state?.success) {
    router.push("login");
  }

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
          Registro de Usuario
        </h2>

        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Nombre <Asterisk size={16} className="text-red-500" />
              </FormLabel>

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
              <FormLabel className="flex gap-1">
                Apellido <Asterisk size={16} className="text-red-500" />
              </FormLabel>
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
              <FormLabel className="flex gap-1">
                DNI <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="number_phone.areaCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1">
                  Cod. de área
                  <Asterisk size={16} className="text-red-500" />
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Código de área" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="number_phone.number"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="flex gap-1">
                  Número de telefóno (sin 15)
                  <Asterisk size={16} className="text-red-500" />
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Número" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
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
          control={form.control}
          name="confirmEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Confirmas correo electrónico{" "}
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
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Contraseña
                <Asterisk size={16} className="text-red-500" />
              </FormLabel>
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
              <FormLabel className="flex gap-1">
                Confirmar <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonSubmit text="Registrarse" />

        <p className="text-center text-sm text-muted-foreground">
          Do you already have an account?
          <Link
            href="login"
            className="mx-4 font-medium text-primary hover:underline"
            prefetch={false}
          >
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
}
