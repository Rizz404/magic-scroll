import useOauthFirebase from "@/hooks/useOauthFirebase";
import { LoginSchema } from "@/lib/zod/auth";
import { useAuthMutation } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate, isPending } = useAuthMutation({ navigateTo: "/", authType: "login" });
  const { signInWithGoogle, isLoading, isPending: oauthPending } = useOauthFirebase();

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    mutate({ ...data });
  };

  if (isLoading || oauthPending) {
    return <span>Loading</span>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10">
      <div className="form-control">
        <label className="label">
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
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="password"
          className="input input-bordered"
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors.password?.message}</span>
        </label>
      </div>

      <div className="form-control">
        <p className=" text-end link-hover mb-3">
          <Link to="/register">Register</Link>
        </p>
        <button type="submit" className="btn btn-primary mb-3" disabled={isSubmitting || isPending}>
          <span className=" text-xl text-white">Login</span>
        </button>
        <button
          type="button"
          onClick={async () => signInWithGoogle()}
          className="btn btn-secondary">
          <span className=" text-xl text-white">
            {isLoading ? "Loading..." : "Login with google"}
          </span>
        </button>
      </div>
    </form>
  );
};
export default LoginPage;
