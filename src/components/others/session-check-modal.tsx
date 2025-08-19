import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SessionCheckModal = ({ isOpen, onClose }: AuthModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Iniciar sesión requerido</DialogTitle>
          <DialogDescription>
            Debes iniciar sesión para continuar.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex justify-end space-x-4">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Link href={"/auth/login"}>Iniciar sesión</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
