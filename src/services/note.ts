import axiosInstance from "@/config/axiosInstance";
import { Note, NoteInput, NoteInteraction } from "@/types/Note";
import { CustomAxiosError, MutationResponse, PaginatedResponse } from "@/types/Response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCreateNote = ({ navigateTo }: { navigateTo: string }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<MutationResponse<Note>, CustomAxiosError, NoteInput>({
    mutationKey: ["create-note"],
    mutationFn: async (data) => {
      return (await axiosInstance.post<MutationResponse<Note>>("/notes", data)).data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      navigate(navigateTo);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error.message);
    },
  });
};

export const useGetPaginatedNotes = ({ page, limit }: { page: number; limit: number }) => {
  return useQuery<PaginatedResponse<Note>, CustomAxiosError>({
    queryKey: ["notes", page, limit],
    queryFn: async () => {
      return (await axiosInstance.get("/notes", { params: { page, limit } })).data;
    },
  });
};

export const useGetNoteById = ({ id }: { id: string }) => {
  return useQuery<Note, CustomAxiosError>({
    queryKey: ["note", id],
    queryFn: async () => {
      return (await axiosInstance.get<Note>(`/notes/${id}`)).data;
    },
  });
};

export const useAddOrRemoveNoteInteraction = ({
  interaction,
}: {
  interaction: "upvote" | "downvote" | "save" | "favorite";
}) => {
  const queryClient = useQueryClient();

  return useMutation<MutationResponse<NoteInteraction>, CustomAxiosError, string>({
    mutationKey: ["note", interaction],
    mutationFn: async (id) => {
      return (await axiosInstance.patch(`/notes/${interaction}/${id}`)).data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note", data.data.noteId] });
    },
  });
};
