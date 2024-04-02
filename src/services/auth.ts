import axiosInstance from "@/config/axiosInstance";
import { RegisterInput, AuthResponse, LoginInput } from "@/types/User";
import { useCurrentUserData } from "@/lib/zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomAxiosError } from "@/types/Response";
import { getRedirectResult, signInWithRedirect, signOut } from "firebase/auth";
import { firebaseAuth, googleProvider } from "@/config/firebaseConfig";

interface UseAuthMutationProps {
  navigateTo: string;
  authType: "register" | "login";
}

export const useAuthMutation = <T extends RegisterInput | LoginInput>({
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
      if (authType === "login") {
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

export const useGoogleLogin = ({ navigateTo }: Omit<UseAuthMutationProps, "authType">) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setCurrentUserInfo } = useCurrentUserData();

  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(firebaseAuth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  useQuery({
    queryKey: ["auth", "users"],
    queryFn: async () => {
      const result = await getRedirectResult(firebaseAuth);

      if (!result || result === null) {
        throw new Error("Somehow result is null");
      }

      const userData = result.user;

      const response = await axiosInstance.post<AuthResponse>("/auth/oauth", {
        uid: userData.uid,
        displayName: userData.displayName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        photoUrl: userData.photoURL,
      });

      localStorage.setItem("token", response.data.token!);
      setCurrentUserInfo(response.data.data);

      return response;
    },
  });

  const handleGoogleRedirect = useMutation({
    mutationKey: ["auth", "users"],
    mutationFn: async () => {
      await signInWithGoogle();
    },
    onSuccess: () => {
      navigate(navigateTo);
      queryClient.invalidateQueries({ queryKey: ["auth", "users"] });
      toast.success("Login successful");
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return handleGoogleRedirect;
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
    onMutate: async () => {
      await signOut(firebaseAuth);
    },
    onSuccess: (response) => {
      localStorage.removeItem("token");
      setCurrentUserInfo(null);
      navigate(navigateTo);
      toast.success(response.message || "Logout successful");
      queryClient.invalidateQueries();
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
};
