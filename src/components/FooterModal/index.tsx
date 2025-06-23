import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Loader2, LoaderCircle } from "lucide-react";

interface FooterModalProps {
  onClose: () => void;
  labelCancel?: string;
  labelConfirm?: string;
  labelLoading?: string;
  isLoading?: boolean;
}
export function FooterModal({
  onClose,
  labelCancel,
  labelConfirm,
  labelLoading,
  isLoading,
}: FooterModalProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleConfirm = () => {
    setShowConfirmDialog(false);
    onClose?.();
  };
  return (
    <>
      <div className="flex gap-2 justify-end mt-4">
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" className="cursor-pointer">
              {labelCancel ?? "Cancelar"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tem certeza?</DialogTitle>
              <DialogDescription>
                Essa ação irá descartar todas as alterações feitas.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="ghost"
                className="cursor-pointer"
                onClick={() => setShowConfirmDialog(false)}
              >
                Voltar
              </Button>
              <Button
                variant="destructive"
                className="cursor-pointer"
                onClick={handleConfirm}
              >
                Sim, cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* <Button type="submit">{labelConfirm ?? "Salvar"}</Button> */}
        <Button type="submit" className="cursor-pointer" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              {labelLoading ?? "salvando..."}
            </>
          ) : (
            labelConfirm ?? "Salvar"
          )}
        </Button>
      </div>
    </>
  );
}
