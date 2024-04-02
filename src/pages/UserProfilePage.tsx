import UpdateUser from "@/components/user/UpdateUser";
import UpdateUserProfile from "@/components/user/UpdateUserProfile";
import { useLogoutMutation } from "@/services/auth";
import { useGetUserProfileQuery } from "@/services/user";

const UserProfilePage = () => {
  const { data: user, isLoading, isError, error } = useGetUserProfileQuery();
  const { mutate, isPending } = useLogoutMutation({ navigateTo: "/" });

  if (isLoading) return <span>Loading</span>;
  if (isError) return <span>Error {error && error.message}</span>;
  if (!user) return <span>No user data</span>;

  return (
    <div className="m-4 border">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4 p-4">
          <UpdateUser {...user} />
          <UpdateUserProfile {...user.profile} />
          <button
            type="button"
            className="btn btn-error"
            onClick={() => mutate()}
            disabled={isPending}>
            Logout
          </button>
        </div>
        <div className=" border">detailuu</div>
      </div>
    </div>
  );
};
export default UserProfilePage;
