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
        <Link to="/">Home</Link>
      </div>
      <div>
        {currentUserInfo ? (
          <button type="button" onClick={handleLogout} disabled={isPending}>
            {isPending ? "Logging out..." : "Logout"}
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      {currentUserInfo && (
        <>
          <div>
            <Link to="/profile">Profile</Link>
          </div>
          <div>
            <Link to="/create-tag">Create Tag</Link>
          </div>
          <div>
            <Link to="/create-study">Create Study</Link>
          </div>
          <div>
            <Link to="/create-note">Create Note</Link>
          </div>
        </>
      )}
    </nav>
  );
};
export default Navbar;
