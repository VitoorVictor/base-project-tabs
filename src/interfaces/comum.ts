export interface IMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IResponse<T> {
  meta: IMeta;
  items: T[];
}

export interface IResponseFetch<T> {
  response?: T;
  message: string;
  error: string;
  statusCode: number;
}

export interface IFilterQry {
  order?: string;
  type?: string;
  page?: number;
  search?: string;
}

export interface IError {
  error: string;
  message: string;
  statusCode: number;
}
