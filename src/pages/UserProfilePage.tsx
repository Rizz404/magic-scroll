import { useGetUserProfileQuery } from "@/services/user";
import { useCurrentUserData } from "@/lib/zustand";

const UserProfilePage = () => {
  const { token } = useCurrentUserData();
  const { data: user, isLoading, isError, error } = useGetUserProfileQuery();

  if (isLoading) return <span>Loading</span>;
  if (isError) return <span>Error {error && error.message}</span>;

  return (
    <div>
      <h2>{user?.username}</h2>
      <h3>{token}</h3>
    </div>
  );
};
export default UserProfilePage;
