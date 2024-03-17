import axiosInstance from "@/config/axiosInstance";
import { Note } from "@/types/Note";
import { MutationResponse, PaginatedResponse } from "@/types/Response";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCreateNote = ({ navigateTo }: { navigateTo: string }) => {
  const navigate = useNavigate();
  return useMutation<MutationResponse<Note>, Error, Omit<Note, "id" | "createdAt" | "updatedAt">>({
    mutationKey: ["notes"],
    mutationFn: async (data) => {
      return (await axiosInstance.post<MutationResponse<Note>>("/notes", data)).data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      navigate(navigateTo);
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error.message);
    },
  });
};

export const useGetPaginatedNotes = ({ page, limit }: { page: number; limit: number }) => {
  return useQuery<PaginatedResponse<Note>, Error>({
    queryKey: ["notes", page, limit],
    queryFn: async () => {
      return (await axiosInstance.get("/notes", { params: { page, limit } })).data;
    },
  });
};

export const useGetNoteById = ({ id }: { id: string }) => {
  return useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: async () => {
      return (await axiosInstance.get<Note>(`/notes/${id}`)).data;
    },
  });
};
