import { RegisterSchema } from "@/lib/zod/auth";
import { useAuthMutation } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({ resolver: zodResolver(RegisterSchema) });

  const { mutate, isPending } = useAuthMutation({ navigateTo: "/login", authType: "register" });

  const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
    mutate({ username: data.username, email: data.email, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" max-w-md mx-auto mt-10">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          type="text"
          {...register("username")}
          placeholder="username"
          className="input input-bordered"
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors.username?.message}</span>
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="text"
          {...register("email")}
          placeholder="email"
          className="input input-bordered"
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors.email?.message}</span>
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          {...register("password")}
          placeholder="password"
          className="input input-bordered"
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors.password?.message}</span>
        </label>
      </div>

      <div className="form-control">
        <p className=" text-end link-hover mb-3">
          <Link to="/login">Login</Link>
        </p>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting || isPending}>
          Register
        </button>
      </div>
    </form>
  );
};
export default RegisterPage;
