import { Button } from "@/components/ui/button";
import Loading from "@/components/others/Loading";
import { useFormStatus } from "react-dom";

interface ButtonSubmitProps {
  text: string;
}

export const ButtonSubmit = ({ text }: ButtonSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loading color="accent" size="sm" /> : text}
    </Button>
  );
};
