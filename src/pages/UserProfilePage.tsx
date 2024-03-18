import { useGetUserProfileQuery } from "@/services/user";

const UserProfilePage = () => {
  const { data: user, isLoading, isError, error } = useGetUserProfileQuery();

  if (isLoading) return <span>Loading</span>;
  if (isError) return <span>Error {error && error.message}</span>;

  return (
    <div className=" m-4">
      <h2>{user?.username}</h2>
    </div>
  );
};
export default UserProfilePage;
