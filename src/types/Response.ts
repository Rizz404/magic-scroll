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
