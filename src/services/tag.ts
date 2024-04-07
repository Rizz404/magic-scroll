import axiosInstance from "@/config/axiosInstance";
import { CustomAxiosError, MutationResponse, PaginatedResponse } from "@/types/Response";
import { Tag } from "@/types/Tag";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateTagMutation = () => {
  return useMutation<MutationResponse<Tag>, Error, Pick<Tag, "name" | "description">>({
    mutationKey: ["tags"],
    mutationFn: async (data) => {
      return (await axiosInstance.post<MutationResponse<Tag>>("/tags", data)).data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetTags = ({ page, limit }: { page: number; limit: number }) => {
  return useQuery<PaginatedResponse<Tag>, Error>({
    queryKey: ["tags", page, limit],
    queryFn: async () => {
      const response = await axiosInstance.get<PaginatedResponse<Tag>>("/tags", {
        params: { page, limit },
      });
      return response.data;
    },
  });
};

export const useGetTagById = ({ id }: { id: string }) => {
  return useQuery<Tag, Error>({
    queryKey: ["tag", id],
    queryFn: async () => {
      const response = await axiosInstance.get<Tag>(`/tags/${id}`);
      return response.data;
    },
  });
};

export const useSearchTagByName = ({ name }: { name: string }) => {
  const { data, isLoading, isError, error, refetch, ...rest } = useQuery<
    PaginatedResponse<Tag>,
    CustomAxiosError
  >({
    queryKey: ["search-tag", name],
    queryFn: () => {
      return axiosInstance.get("/tags/search", { params: { name } });
    },
    enabled: Boolean(name),
  });

  return {
    tags: data?.data,
    tagsPaginationState: data?.paginationState,
    isLoadingTags: isLoading,
    isErrorTags: isError,
    errorTags: error,
    refetchTags: refetch,
    ...rest,
  };
};
