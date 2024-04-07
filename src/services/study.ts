import axiosInstance from "@/config/axiosInstance";
import { MutationResponse, PaginatedResponse } from "@/types/Response";
import { Study } from "@/types/Study";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCreateStudy = ({ navigateTo }: { navigateTo?: string }) => {
  const navigate = useNavigate();
  return useMutation<
    MutationResponse<Study>,
    Error,
    Pick<Study, "name" | "image" | "description">
  >({
    mutationKey: ["studies"],
    mutationFn: async (data) => {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);

      if (data.image) {
        formData.append("image", (data.image as string)[0]);
      }

      return (
        await axiosInstance.post<MutationResponse<Study>>("/studies", formData)
      ).data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      navigateTo && navigate(navigateTo);
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error.message);
    },
  });
};

export const useGetStudies = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery<PaginatedResponse<Study>, Error>({
    queryKey: ["studies", page, limit],
    queryFn: async () => {
      return (await axiosInstance.get("/studies", { params: { page, limit } }))
        .data;
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

export const useSearchStudyByName = ({
  page = 1,
  limit = 5,
}: {
  page?: number;
  limit?: number;
}) => {
  const [query, setQuery] = useState("");

  const { data, isLoading, isError, error, refetch, ...rest } = useQuery<
    PaginatedResponse<Study>
  >({
    queryKey: ["search-study", query],
    queryFn: async () => {
      return (
        await axiosInstance.get("/studies/search", {
          params: { name: query, page, limit },
        })
      ).data;
    },
  });

  return {
    query,
    setQuery,
    studies: data?.data || [],
    studiesPaginationState: data?.paginationState,
    isLoadingStudies: isLoading,
    isErrorStudies: isError,
    errorStudies: error,
    refetchStudies: refetch,
    ...rest,
  };
};
