export interface IAnexo {
  id: string;
  titulo: string;
  observacao?: string | null;
  arquivo?: string;
  tamanho?: number;
  vinculoId?: number;
  ext?: string;
  micrologInclusao?: string;
  createdAt: string;
  file?: File;
}
