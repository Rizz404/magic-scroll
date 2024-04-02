import { firebaseAuth, googleProvider } from "@/config/firebaseConfig";
import { useCurrentUserData } from "@/lib/zustand";
import { useAuthMutation } from "@/services/auth";
import { getRedirectResult, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useOauthFirebase = () => {
  const { mutateAsync, isPending } = useAuthMutation({ authType: "oauth" });
  const { setCurrentUserInfo } = useCurrentUserData();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signInWithRedirect(firebaseAuth, googleProvider);
    } catch (error) {
      console.error(error);
      toast.error(error as string);
    }
  };

  // todo: masih ada delay sedikit setelah redirect oauth fix
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(firebaseAuth);

        if (!result) throw new Error("Can't get result somehow");

        const userData = result.user;

        // todo: tambahin default value biar kaga error
        await mutateAsync({
          uid: userData.uid,
          displayName: userData.displayName!,
          email: userData.email!,
          phoneNumber: userData.phoneNumber!,
          photoUrl: userData.photoURL!,
        });
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        handleRedirect();
      }
    });

    return unsubscribe;
  }, [mutateAsync, setCurrentUserInfo]);

  return { signInWithGoogle, isLoading, isPending, error };
};

export default useOauthFirebase;
