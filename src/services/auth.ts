import axiosInstance from "@/config/axiosInstance";
import { RegisterInput, AuthResponse, LoginInput } from "@/types/User";
import { useCurrentUserData } from "@/lib/zustand";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  return useMutation<AuthResponse, Error, T>({
    mutationKey: ["auth"],
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
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });
};

export const useLogoutMutation = ({ navigateTo }: Omit<UseAuthMutationProps, "authType">) => {
  const navigate = useNavigate();
  const { setToken, setCurrentUserInfo } = useCurrentUserData();

  return useMutation({
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
