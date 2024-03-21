import axiosInstance from "@/config/axiosInstance";
import { RegisterInput, AuthResponse, LoginInput } from "@/types/User";
import { useCurrentUserData } from "@/lib/zustand";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomAxiosError } from "@/types/Response";

interface UseAuthMutationProps {
  navigateTo: string;
  authType: "register" | "login";
}

export const useAuthMutation = <T extends RegisterInput | LoginInput>({
  navigateTo,
  authType,
}: UseAuthMutationProps) => {
  const navigate = useNavigate();
  const { setToken, setCurrentUserInfo } = useCurrentUserData();

  return useMutation<AuthResponse, CustomAxiosError, T>({
    mutationKey: ["auth", "users"],
    mutationFn: async (userData: T) => {
      return (await axiosInstance.post<AuthResponse>(`/auth/${authType}`, userData)).data;
    },
    onSuccess: (response) => {
      if (authType === "login") {
        setToken(response.token!);
        setCurrentUserInfo(response.data);
        localStorage.setItem("token", response.token!);
      }
      toast.success(response.message);
      navigate(navigateTo);
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

export const useGoogleLogin = () => {
  return useQuery({
    queryKey: ["auth", "users"],
    queryFn: async () => {
      return (await axiosInstance.get("/auth/google")).data;
    },
    enabled: false,
  });
};

export const useLogoutMutation = ({ navigateTo }: Omit<UseAuthMutationProps, "authType">) => {
  const navigate = useNavigate();
  const { setToken, setCurrentUserInfo } = useCurrentUserData();

  return useMutation<{ message: string }, CustomAxiosError, null>({
    mutationKey: ["auth"],
    mutationFn: async () => {
      return (await axiosInstance.post<{ message: string }>("/auth/logout")).data;
    },
    onSuccess: (response) => {
      setToken(null);
      setCurrentUserInfo(null);
      navigate(navigateTo);
      toast.success(response.message || "Logout successful");
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
};
