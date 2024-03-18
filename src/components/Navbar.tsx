import { useCurrentUserData } from "@/lib/zustand";
import { useLogoutMutation } from "@/services/auth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentUserInfo } = useCurrentUserData();
  const { mutate, isPending, isError, error } = useLogoutMutation({ navigateTo: "/login" });

  const handleLogout = () => {
    mutate();
  };

  return (
    <nav className="flex justify-between">
      {isError && error && <div>Error: {error.message}</div>}
      <div>
        {currentUserInfo ? (
          <button type="button" onClick={handleLogout} disabled={isPending}>
            {isPending ? "Logging out..." : "logout"}
          </button>
        ) : (
          <Link to="/login">login</Link>
        )}
      </div>
      <div>
        <Link to="/profile">profile</Link>
      </div>
    </nav>
  );
};
export default Navbar;
