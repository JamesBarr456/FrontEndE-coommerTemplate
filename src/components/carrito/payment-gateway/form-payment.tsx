"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CreditCard, Truck, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const numberRegex = /^\d+$/;

const formSchema = z
  .object({
    first_name: z.string().min(2, "First Name is required"),
    last_name: z.string().min(2, "Last Name is required"),
    number_phone: z.object({
      areaCode: z
        .string()
        .min(2, { message: "Code must be at least 2 digits" })
        .max(4, { message: "Code can't exceed 4 digits" })
        .regex(numberRegex, "Code must contain only numbers"),
      number: z
        .string()
        .min(6, { message: "Number must be at least 6 digits" })
        .max(10, { message: "Number can't exceed 10 digits" })
        .regex(numberRegex, "Phone number must contain only numbers"),
    }),
    email: z.string().email("Invalid email"),
    adress: z.string().min(5, "Address is required"),
    delivery_option: z.enum(["pickup", "delivery"], {
      required_error: "Please select a delivery option",
    }),
    locality: z.string().min(1, "Locality is required").optional(),
    shipping_type: z.string().min(1, "Shipping type is required").optional(),
    payment_method: z.enum(["cash", "transfer"], {
      required_error: "Please select a payment method",
    }),
  })
  .refine(
    (data) => {
      if (data.delivery_option === "delivery") {
        return data.locality && data.shipping_type;
      }
      return true;
    },
    {
      message: "Locality and shipping type are required for delivery",
      path: ["locality"],
    }
  );

type FormData = z.infer<typeof formSchema>;

const shippingRates = {
  "corrientes-capital": {
    name: "Corrientes, Capital",
    standard: { name: "Minimo", rate: 2000 },
    express: { name: "Maximo", rate: 2500 },
  },
  "san-luis-palmas": {
    name: "San Luis del Palmas",
    standard: { name: "Minimo", rate: 2500 },
    express: { name: "Maximo", rate: 3000 },
  },
  itaibate: {
    name: "Itaibate",
    standard: { name: "Minimo", rate: 3000 },
    express: { name: "Maximo", rate: 3500 },
  },
  "resistencia-chaco": {
    name: "Resistencia-Chaco",
    standard: { name: "Minimo", rate: 3500 },
    express: { name: "Maximo", rate: 4000 },
  },
  "paso-patria": {
    name: "Paso de la Patria",
    standard: { name: "Minimo", rate: 2700 },
    express: { name: "Maximo", rate: 3200 },
  },
  empedrado: {
    name: "Empedrado",
    standard: { name: "Minimo", rate: 2300 },
    express: { name: "Maximo", rate: 2800 },
  },
  "el-sombrero": {
    name: "El Sombrero",
    standard: { name: "Minimo", rate: 2800 },
    express: { name: "Maximo", rate: 3300 },
  },
  "bella-vista": {
    name: "Bella Vista",
    standard: { name: "Minimo", rate: 2400 },
    express: { name: "Maximo", rate: 2900 },
  },
};

export const PaymentFormSteps = () => {
  const [activeStep, setActiveStep] = useState("personal");
  const router = useRouter();
  const { cartItems, updateStatusCart } = useCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      number_phone: {
        areaCode: "",
        number: "",
      },
      email: "",
      adress: "",
      delivery_option: undefined,
      locality: "",
      shipping_type: "",
      payment_method: undefined,
    },
    mode: "onChange",
  });

  const isFormValid = form.formState.isValid;
  const deliveryOption = form.watch("delivery_option");
  const paymentMethod = form.watch("payment_method");
  const selectedLocality = form.watch("locality");
  const selectedShippingType = form.watch("shipping_type");

  const empty = !cartItems || cartItems.items.length === 0;

  const calculateTotal = () => {
    const baseTotal = cartItems?.total_amount || 0;

    if (paymentMethod === "transfer") {
      return baseTotal * 1.05;
    }
    return baseTotal;
  };

  const sendToWhatsApp = (data: FormData) => {
    const total = calculateTotal();
    const shippingInfo = selectedLocality
      ? shippingRates[selectedLocality as keyof typeof shippingRates]
      : null;

    let message = `🛒 *NUEVO ORDEN DE PEDIDO*\n\n`;
    message += `👤 *Datos del Cliente:*\n`;
    message += `Nombre: ${data.first_name} ${data.last_name}\n`;
    message += `Teléfono: +${data.number_phone.areaCode} ${data.number_phone.number}\n`;
    message += `Email: ${data.email}\n\n`;

    message += `📦 *Datos de Envío:*\n`;
    message += `Opción: ${
      data.delivery_option === "pickup"
        ? "Retiro en local"
        : "Envío a domicilio"
    }\n`;

    if (data.delivery_option === "delivery") {
      message += `Dirección: ${data.adress}\n`;
      if (shippingInfo && selectedShippingType) {
        message += `Localidad: ${shippingInfo.name}\n`;
        const shippingOption =
          selectedShippingType === "standard"
            ? shippingInfo.standard
            : shippingInfo.express;
        message += `Tipo de envío: ${shippingOption.name}\n`;
        message += `Costo de envío: $${shippingOption.rate}\n`;
      }
    }

    message += `\n💳 *Método de Pago:*\n`;
    message += `${
      data.payment_method === "cash" ? "Efectivo" : "Transferencia (+5%)"
    }\n\n`;

    message += `🛍️ *Productos del Carrito:*\n`;
    cartItems?.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - Cantidad: ${item.quantity} - $${
        item.price
      }\n`;
    });

    message += `\n💰 *Total: $${total.toFixed(2)}*`;

    const phoneNumber = "5493794405430";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  const onSubmit = async (data: FormData) => {
    try {
      // await updateStatusCart("completed")
      sendToWhatsApp(data);
      setIsDialogOpen(true);
    } catch (error) {
      toast({
        title: "Error en el pedido",
        description: `Ha ocurrido un error al procesar el pedido. Por favor, inténtalo de nuevo. ${
          (error as Error).message
        }`,
        variant: "destructive",
      });
    }
  };

  const handleTabChange = (value: string) => {
    setActiveStep(value);
  };

  const handleNextStep = () => {
    if (activeStep === "personal") {
      setActiveStep("envio");
    } else if (activeStep === "envio") {
      setActiveStep("pago");
    }
  };

  const handlePreviousStep = () => {
    if (activeStep === "pago") {
      setActiveStep("envio");
    } else if (activeStep === "envio") {
      setActiveStep("personal");
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    router.push("/");
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Proceso de Pago</CardTitle>
      </CardHeader>
      <CardContent>
        {empty ? (
          <EmptyForm />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs value={activeStep} onValueChange={handleTabChange}>
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
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <Input placeholder="Ingresa tu nombre" {...field} />
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
                          <Input placeholder="Ingresa tu apellido" {...field} />
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
                            <FormLabel>Código de área</FormLabel>
                            <Input placeholder="379" {...field} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="number_phone.number"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Número de teléfono</FormLabel>
                            <Input placeholder="4701723" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <Input
                            type="email"
                            placeholder="tu@email.com"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="envio">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="delivery_option"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Opción de Entrega</FormLabel>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="pickup" id="pickup" />
                              <label htmlFor="pickup">Retiro en local</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="delivery" id="delivery" />
                              <label htmlFor="delivery">
                                Envío a domicilio
                              </label>
                            </div>
                          </RadioGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {deliveryOption === "pickup" && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-900 mb-2">
                          Información de Retiro
                        </h3>
                        <p className="text-sm text-blue-800 mb-2">
                          Puedes pasar a retirar sin cargo o llamar para
                          coordinar otro modo.
                        </p>
                        <div className="text-sm text-blue-800 space-y-1">
                          <p>
                            <strong>Dirección:</strong> Av. Pedro Ferré 1802,
                            W3408MRO, Corrientes
                          </p>
                          <p>
                            <strong>Teléfono:</strong> 0379 470-1723
                          </p>
                          <div>
                            <strong>Horario:</strong>
                            <ul className="ml-4 mt-1">
                              <li>Lunes: 8 a.m.–9 p.m.</li>
                              <li>Martes: 8 a.m.–9 p.m.</li>
                              <li>Miércoles: 8 a.m.–9 p.m.</li>
                              <li>Jueves: 8 a.m.–9 p.m.</li>
                              <li>Viernes: 8 a.m.–9 p.m.</li>
                              <li>Sábado: 8 a.m.–9 p.m.</li>
                              <li>Domingo: Cerrado</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {deliveryOption === "delivery" && (
                      <>
                        <FormField
                          control={form.control}
                          name="locality"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Localidad</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona una localidad" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(shippingRates).map(
                                    ([key, value]) => (
                                      <SelectItem key={key} value={key}>
                                        {value.name}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {selectedLocality && (
                          <FormField
                            control={form.control}
                            name="shipping_type"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Tipo de Envío</FormLabel>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-2"
                                >
                                  <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="standard"
                                        id="standard"
                                      />
                                      <label
                                        htmlFor="standard"
                                        className="font-medium"
                                      >
                                        {
                                          shippingRates[
                                            selectedLocality as keyof typeof shippingRates
                                          ]?.standard.name
                                        }
                                      </label>
                                    </div>
                                    <span className="font-semibold text-green-600">
                                      $
                                      {
                                        shippingRates[
                                          selectedLocality as keyof typeof shippingRates
                                        ]?.standard.rate
                                      }
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="express"
                                        id="express"
                                      />
                                      <label
                                        htmlFor="express"
                                        className="font-medium"
                                      >
                                        {
                                          shippingRates[
                                            selectedLocality as keyof typeof shippingRates
                                          ]?.express.name
                                        }
                                      </label>
                                    </div>
                                    <span className="font-semibold text-blue-600">
                                      $
                                      {
                                        shippingRates[
                                          selectedLocality as keyof typeof shippingRates
                                        ]?.express.rate
                                      }
                                    </span>
                                  </div>
                                </RadioGroup>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        <FormField
                          control={form.control}
                          name="adress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dirección</FormLabel>
                              <Input placeholder="Calle y número" {...field} />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="pago">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="payment_method"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Método de Pago</FormLabel>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="cash" id="cash" />
                              <label htmlFor="cash">Efectivo</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="transfer" id="transfer" />
                              <label htmlFor="transfer">
                                Transferencia (+5%)
                              </label>
                            </div>
                          </RadioGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {paymentMethod === "transfer" && (
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                          <strong>Nota:</strong> Al seleccionar transferencia se
                          aplicará un incremento del 5% sobre el total de la
                          compra.
                        </p>
                      </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <h3 className="font-semibold mb-2">Resumen del Pedido</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>${cartItems?.total_amount?.toFixed(2)}</span>
                        </div>
                        {paymentMethod === "transfer" && (
                          <div className="flex justify-between text-yellow-600">
                            <span>Incremento transferencia (5%):</span>
                            <span>
                              +$
                              {((cartItems?.total_amount || 0) * 0.05).toFixed(
                                2
                              )}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between font-semibold text-lg border-t pt-1">
                          <span>Total:</span>
                          <span>${calculateTotal().toFixed(2)}</span>
                        </div>
                      </div>
                      {deliveryOption === "delivery" &&
                        selectedLocality &&
                        selectedShippingType && (
                          <div className="mt-3 pt-3 border-t">
                            <h4 className="font-medium text-sm mb-1">
                              Información de Envío:
                            </h4>
                            <div className="text-sm text-gray-600">
                              <div className="flex justify-between">
                                <span>
                                  {selectedShippingType === "standard"
                                    ? shippingRates[
                                        selectedLocality as keyof typeof shippingRates
                                      ]?.standard.name
                                    : shippingRates[
                                        selectedLocality as keyof typeof shippingRates
                                      ]?.express.name}
                                  :
                                </span>
                                <span>
                                  $
                                  {selectedShippingType === "standard"
                                    ? shippingRates[
                                        selectedLocality as keyof typeof shippingRates
                                      ]?.standard.rate
                                    : shippingRates[
                                        selectedLocality as keyof typeof shippingRates
                                      ]?.express.rate}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                *El costo de envío se coordina por separado
                              </p>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between">
                {activeStep !== "personal" && (
                  <Button type="button" onClick={handlePreviousStep}>
                    Anterior
                  </Button>
                )}
                {activeStep !== "pago" ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className={activeStep === "personal" ? "ml-auto" : ""}
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button type="submit" disabled={!isFormValid}>
                    Confirmar Pedido
                  </Button>
                )}
              </div>
            </form>
          </Form>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pedido Confirmado</DialogTitle>
              <DialogDescription>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                  <p>Su pedido ha sido enviado por WhatsApp exitosamente.</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleDialogClose}>Volver al Inicio</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const EmptyForm = () => {
  return (
    <div className="text-center p-4">
      <h2 className="text-xl font-semibold mb-2">Carrito Vacío</h2>
      <p className="mb-4">No puedes realizar un pago con el carrito vacío.</p>
      <Button asChild>
        <Link href="/products">Volver a la Tienda</Link>
      </Button>
    </div>
  );
};
