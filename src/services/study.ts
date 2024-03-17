import axiosInstance from "@/config/axiosInstance";
import { MutationResponse, PaginatedResponse } from "@/types/Response";
import { Study } from "@/types/Study";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCreateStudy = ({ navigateTo }: { navigateTo: string }) => {
  const navigate = useNavigate();
  return useMutation<MutationResponse<Study>, Error, Pick<Study, "name" | "image" | "description">>(
    {
      mutationKey: ["studies"],
      mutationFn: async (data) => {
        return (await axiosInstance.post<MutationResponse<Study>>("/studies", data)).data;
      },
      onSuccess: (response) => {
        toast.success(response.message);
        navigate(navigateTo);
      },
      onError: (error) => {
        toast.error(error.message);
        console.error(error.message);
      },
    }
  );
};

export const useGetStudies = ({ page, limit }: { page: number; limit: number }) => {
  return useQuery<PaginatedResponse<Study>, Error>({
    queryKey: ["studies", page, limit],
    queryFn: async () => {
      return (await axiosInstance.get("/studies", { params: { page, limit } })).data;
    },
  });
};

export const useGetStudyById = ({ id }: { id: string }) => {
  return useQuery<Study, Error>({
    queryKey: ["study", id],
    queryFn: async () => {
      return (await axiosInstance.get<Study>(`/studies/${id}`)).data;
    },
  });
};
