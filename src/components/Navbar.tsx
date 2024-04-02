import { useCurrentUserData } from "@/lib/zustand";
import { FaSearch } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUserInfo } = useCurrentUserData();

  return (
    <header className=" bg-cyan-400 py-2">
      <nav className="px-2 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div
              className="flex gap-2 rounded bg-cyan-600 p-2 hover:cursor-pointer"
              onClick={() => navigate("/")}>
              <img
                src="https://i.pinimg.com/474x/7d/4a/e9/7d4ae9a9d01045cac6b1a1f9b46ab68b.jpg"
                alt="image"
                className=" w-8"
              />
              <span className=" text-cyan-950 font-bold text-2xl hover:text-white">Notes</span>
            </div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-950 font-bold text-lg underline underline-offset-8 hidden lg:block"
                  : "text-cyan-950 font-bold text-lg hover:underline underline-offset-8 hidden lg:block"
              }>
              Home
            </NavLink>
          </div>

          <div className=" flex-grow hidden md:block">
            <div className=" flex justify-center items-center">
              <div className=" px-3 py-2 rounded flex items-center text-cyan-950 bg-white w-96">
                <input
                  type="text"
                  className="border-none focus:outline-none focus:ring-0 w-full bg-white"
                  placeholder="Search..."
                />
                <button type="button" className="ml-2 text-lg">
                  <FaSearch className="text-cyan-950 hover:text-cyan-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <NavLink
              to="/create-study"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-950 font-bold text-lg underline underline-offset-8"
                  : "text-cyan-950 font-bold text-lg hover:underline underline-offset-8"
              }>
              Create Study
            </NavLink>
            <NavLink
              to="/create-tag"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-950 font-bold text-lg underline underline-offset-8"
                  : "text-cyan-950 font-bold text-lg hover:underline underline-offset-8"
              }>
              Create Tag
            </NavLink>
            <NavLink
              to="/create-note"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-950 font-bold text-lg underline underline-offset-8"
                  : "text-cyan-950 font-bold text-lg hover:underline underline-offset-8"
              }>
              Create Note
            </NavLink>
            <div className=" text-cyan-950 flex gap-2">
              {!currentUserInfo ? (
                <>
                  <button
                    className=" bg-cyan-600 font-bold rounded-full p-2 hover:text-white"
                    type="button"
                    onClick={() => navigate("/register")}>
                    Register
                  </button>
                  <button
                    className=" bg-cyan-600 font-bold rounded-full p-2 hover:text-white"
                    type="button"
                    onClick={() => navigate("/login")}>
                    Login
                  </button>
                </>
              ) : (
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-cyan-950 font-bold text-lg underline underline-offset-8"
                      : "text-cyan-950 font-bold text-lg hover:underline underline-offset-8"
                  }>
                  Profile{" "}
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
