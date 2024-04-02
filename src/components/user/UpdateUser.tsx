import { UserSchema } from "@/lib/zod/user";
import { useUpdateUserQuery } from "@/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

interface UpdateUserProps {
  username?: string;
  email?: string;
  isOauth?: boolean;
}

const UpdateUser = ({ username, email, isOauth }: UpdateUserProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserSchema>({
    resolver: zodResolver(UserSchema),
    defaultValues: { username, email },
  });

  const { mutate, isPending, isError, error } = useUpdateUserQuery();

  const onSubmit: SubmitHandler<UserSchema> = (data) => {
    mutate(data);
    console.log(data);
    isError && console.log(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" form-control">
        <label className=" label" htmlFor="username">
          <span className="label-text">Username</span>
        </label>
        <input
          {...register("username")}
          type="text"
          placeholder="username"
          className="input input-bordered"
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors.username?.message}</span>
        </label>
      </div>
      <div className="form-control">
        <label className=" label" htmlFor="email">
          <span className="label-text">Email</span>
        </label>
        <input
          {...register("email")}
          type="text"
          placeholder="email"
          className="input input-bordered"
          disabled={isOauth}
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors.email?.message}</span>
        </label>
      </div>
      <div className="form-control">
        <button type="submit" className=" btn btn-success" disabled={isPending}>
          Save
        </button>
      </div>
    </form>
  );
};
export default UpdateUser;
