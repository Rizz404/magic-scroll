import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useCurrentUserData } from "@/lib/zustand";

const AuthLayout = () => {
  const { currentUserInfo } = useCurrentUserData();

  return !currentUserInfo ? (
    <div className="w-screen">
      <Navbar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};
export default AuthLayout;
