import axiosInstance from "@/config/axiosInstance";
import { RegisterInput, AuthResponse, LoginInput, OauthInput } from "@/types/User";
import { useCurrentUserData } from "@/lib/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomAxiosError } from "@/types/Response";
import { firebaseAuth } from "@/config/firebaseConfig";
import { signOut } from "firebase/auth";

interface UseAuthMutationProps {
  navigateTo?: string;
  authType: "register" | "login" | "oauth";
}

export const useAuthMutation = <T extends RegisterInput | LoginInput | OauthInput>({
  navigateTo,
  authType,
}: UseAuthMutationProps) => {
  const navigate = useNavigate();
  const { setCurrentUserInfo } = useCurrentUserData();

  return useMutation<AuthResponse, CustomAxiosError, T>({
    mutationKey: ["auth", "users"],
    mutationFn: async (userData: T) => {
      return (await axiosInstance.post<AuthResponse>(`/auth/${authType}`, userData)).data;
    },
    onSuccess: (response) => {
      if (authType === "login" || authType === "oauth") {
        setCurrentUserInfo(response.data);
        localStorage.setItem("token", response.token!);
      }
      toast.success(response.message);
      navigateTo && navigate(navigateTo);
    },
    onError: (error: CustomAxiosError) => {
      if (error.response) {
        const errorMessage = error.response.data.message;
        if (typeof errorMessage === "string") {
          toast.error(errorMessage); // Tipe data sudah dipastikan sebagai string
        } else {
          toast.error("Terjadi kesalahan");
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
        toast.error("Terjadi kesalahan");
      }
    },
  });
};

export const useLogoutMutation = ({ navigateTo }: Omit<UseAuthMutationProps, "authType">) => {
  const navigate = useNavigate();
  const { setCurrentUserInfo } = useCurrentUserData();
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, CustomAxiosError>({
    mutationKey: ["auth"],
    mutationFn: async () => {
      return (
        await axiosInstance.post<{ message: string }>("/auth/logout", null, {
          headers: { Authorization: null },
        })
      ).data;
    },
    onSuccess: async (response) => {
      await signOut(firebaseAuth);
      localStorage.removeItem("token");
      setCurrentUserInfo(null);
      navigateTo && navigate(navigateTo);
      toast.success(response.message || "Logout successful");
      queryClient.removeQueries();
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
};
