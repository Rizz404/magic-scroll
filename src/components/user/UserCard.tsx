import { User } from "@/types/User";

const UserCard = ({ ...user }: User) => {
  return (
    <div className=" bg-slate-400 p-6 rounded-lg border border-dashed shadow">
      <div className=" border-b-2 mb-2 pb-1">
        <div className="flex justify-between items-center">
          <h2 className=" text-xl font-semibold">
            {user.username.length > 20 ? user.username.slice(0, 20) + "..." : user.username}
          </h2>
          <div
            className={`w-3 h-3 rounded-full ${
              user.isVerified ? "bg-green-400" : "bg-red-400"
            }`}></div>
        </div>
        <span className=" text-sm">{user.email}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className=" flex justify-between">
          <p className="font-semibold">Role</p>
          <span>{user.role}</span>
        </div>
        <div className=" flex justify-between">
          <p className="font-semibold">Is Oauth</p>
          <span className={`${user.isOauth ? "text-blue-600" : "text-yellow-600"}`}>
            {user.isOauth ? "Yes" : "No"}
          </span>
        </div>
        <div className=" flex justify-between">
          <p className="font-semibold">Last Login At</p>
          <span>{new Date(user.lastLogin).toLocaleDateString()}</span>
        </div>
        <div className=" flex justify-between">
          <p className="font-semibold">Created At</p>
          <span>{new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
        <div className=" flex justify-between">
          <p className="font-semibold">Updated At</p>
          <span>{new Date(user.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
