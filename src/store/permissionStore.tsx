import { create } from "zustand";

export type Permission = {
  nome: string;
};

type PermissionStore = {
  permissions: Permission[];
  setPermissions: (permissions: Permission[]) => void;
  hasPermission: (permission: string) => boolean;
};

export const usePermissionStore = create<PermissionStore>((set, get) => ({
  permissions: [],
  setPermissions: (permissions: Permission[]) => set(() => ({ permissions })),
  hasPermission: (permission: string) => {
    const { permissions } = get();
    return permissions.some((p) => p.nome === permission);
  },
}));
