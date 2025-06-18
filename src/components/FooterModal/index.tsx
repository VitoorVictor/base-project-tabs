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

interface FooterModalProps {
  onClose: () => void;
  labelCancel?: string;
  labelConfirm?: string;
}
export function FooterModal({
  onClose,
  labelCancel,
  labelConfirm,
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
            <Button type="button" variant="outline">
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
                onClick={() => setShowConfirmDialog(false)}
              >
                Voltar
              </Button>
              <Button variant="destructive" onClick={handleConfirm}>
                Sim, cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button type="submit">{labelConfirm ?? "Salvar"}</Button>
      </div>
    </>
  );
}
