import axiosInstance from "@/config/axiosInstance";
import { CustomAxiosError, MutationResponse, PaginatedResponse } from "@/types/Response";
import { Profile, User } from "@/types/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetPaginatedUsersQuery = ({ page, limit }: { page: number; limit: number }) => {
  const { data, ...muchMore } = useQuery<PaginatedResponse<Omit<User, "password">>, Error>({
    queryKey: ["users", page, limit],
    queryFn: async () => {
      return (
        await axiosInstance.get<PaginatedResponse<Omit<User, "password">>>("/users", {
          params: { page, limit },
        })
      ).data;
    },
  });

  return {
    users: data?.data || [],
    paginationState: data?.paginationState,
    ...muchMore,
  };
};

export const useGetUserProfileQuery = () => {
  return useQuery<User, Error>({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      return (await axiosInstance.get<User>("/users/profile")).data;
    },
  });
};

export const useGetUserByIdQuery = ({ id }: { id: string }) => {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: async () => {
      return (await axiosInstance.get<User>(`/users/${id}`)).data;
    },
  });
};

export const useCheckUserAvailability = () => {
  return useMutation<
    { message: string },
    CustomAxiosError,
    {
      username?: string;
      email?: string;
    }
  >({
    mutationKey: ["check-user"],
    mutationFn: async (data) => {
      return await axiosInstance.post("/users/check-user-availability", data);
    },
  });
};

export const useUpdateUserQuery = () => {
  const queryClient = useQueryClient();
  return useMutation<
    MutationResponse<Omit<User, "password" | "profile">>,
    Error,
    Pick<User, "username" | "email">
  >({
    mutationKey: ["user", "update"],
    mutationFn: async (data: Pick<User, "username" | "email">) => {
      return (
        await axiosInstance.patch<MutationResponse<Omit<User, "password" | "profile">>>(
          "/users",
          data
        )
      ).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Successfully updated user");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};

export const useUpdateUserProfileQuery = () => {
  const queryClient = useQueryClient();
  return useMutation<
    MutationResponse<Profile>,
    Error,
    Omit<Profile, "id" | "createdAt" | "updatedAt">
  >({
    mutationKey: ["profile", "update"],
    mutationFn: async (data: Omit<Profile, "id" | "createdAt" | "updatedAt">) => {
      return (await axiosInstance.patch<MutationResponse<Profile>>("/users/profile", data)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
      toast.success("Successfully updated user profile");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};

export const useFollowOrUnfollowUserMutation = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  return useMutation<MutationResponse<User>, Error, string>({
    mutationKey: ["user", id, "follow"],
    mutationFn: async () => {
      return (await axiosInstance.patch<MutationResponse<User>>(`/users/follow/${id}`)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};
