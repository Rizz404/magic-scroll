import { create } from "zustand";
import { User } from "@/types/User";
import { persist } from "zustand/middleware";

type UserInfo = Omit<User, "password" | "createdAt" | "updatedAt">;

interface CurrentUserData {
  currentUserInfo: UserInfo | null;
  setCurrentUserInfo: (currentUserInfo: UserInfo | null) => void;
}

// * I don't acctually get it because I'm dumb
export const useCurrentUserData = create(
  persist<CurrentUserData>(
    (set) => ({
      currentUserInfo: null,
      setCurrentUserInfo: (currentUserInfo: UserInfo | null) => set({ currentUserInfo }),
    }),
    { name: "userInfo" }
  )
);
