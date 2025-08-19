import { OrderSummary } from "@/components/carrito/payment-gateway/order-summary";
import { PaymentFormSteps } from "@/components/carrito/payment-gateway/form-payment";

export default function PasarelaPagosEstructurada() {
  return (
    <div className="container font-poppins mx-auto my-20 flex flex-col lg:grid lg:grid-cols-3 gap-8 p-4">
      <OrderSummary />
      <PaymentFormSteps />
    </div>
  );
}
