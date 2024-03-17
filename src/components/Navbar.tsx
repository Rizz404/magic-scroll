import { useLogoutMutation } from "@/services/auth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { mutate, isPending, isError, error } = useLogoutMutation({ navigateTo: "/login" });

  const handleLogout = () => {
    mutate();
  };

  return (
    <nav>
      <button type="button" onClick={handleLogout} disabled={isPending}>
        {isPending ? "Logging out..." : "logout"}
      </button>
      {isError && error && <div>Error: {error.message}</div>}
      <div>
        <Link to="/register">register</Link>
      </div>
      <div>
        <Link to="/login">login</Link>
      </div>
      <div>
        <Link to="/profile">profile</Link>
      </div>
      <br />
      <br />
    </nav>
  );
};
export default Navbar;
