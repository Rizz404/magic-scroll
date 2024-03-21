import { AxiosError } from "axios";

export interface ServerErrorResponse {
  message: string;
  // Tambahkan properti lain yang sesuai dengan struktur data respons error server Anda
}

export interface CustomAxiosError<T = ServerErrorResponse> extends AxiosError<T> {}

export interface MutationResponse<T> {
  message: string;
  data: T;
  token?: string;
}

export interface PaginatedResponse<T> {
  paginationState: PaginationState;
  data: T[];
}

export interface PaginationState {
  totalData: number;
  dataPerpage: number;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
