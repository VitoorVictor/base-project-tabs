export interface ICidade {
  id: number;
  estadoId?: number;
  descricao: string;
  ibge?: string;
  estado: {
    sigla: string;
  };
  cidadeEstado: string;
}
