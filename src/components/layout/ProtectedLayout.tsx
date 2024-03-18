import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useCurrentUserData } from "@/lib/zustand";
import { useEffect } from "react";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const { currentUserInfo } = useCurrentUserData();

  useEffect(() => {
    if (!currentUserInfo) {
      return navigate("/", { replace: true });
    }
  }, [currentUserInfo, navigate]);

  return (
    <div className="w-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default ProtectedLayout;
