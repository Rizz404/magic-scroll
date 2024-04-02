import { UserProfileSchema } from "@/lib/zod/user";
import { useUpdateUserProfileQuery } from "@/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

interface UpdateUserProfileProps {
  firstName?: string;
  lastName?: string;
  age?: number | null;
  phone?: string;
  socialMedias?: string[];
}

const UpdateUserProfile = ({
  firstName,
  lastName,
  age,
  phone,
  socialMedias,
}: UpdateUserProfileProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileSchema>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: { firstName, lastName, age, phone, socialMedias },
  });

  const { fields, append, remove } = useFieldArray<UserProfileSchema>({
    control,
    name: "socialMedias",
  });

  const { mutate, isPending } = useUpdateUserProfileQuery();

  const onSubmit: SubmitHandler<UserProfileSchema> = (data) => {
    mutate(data);
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label className=" label" htmlFor="firstname">
          <span className="label-text">First Name</span>
        </label>
        <input
          {...register("firstName")}
          type="text"
          placeholder="firstname"
          className="input input-bordered"
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors.firstName?.message}</span>
        </label>
      </div>
      <div className="form-control">
        <label className=" label" htmlFor="lastname">
          <span className="label-text">Last Name</span>
        </label>
        <input
          {...register("lastName")}
          type="text"
          placeholder="lastname"
          className="input input-bordered"
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors.lastName?.message}</span>
        </label>
      </div>
      <div className="form-control">
        <label className=" label" htmlFor="age">
          <span className="label-text">Age</span>
        </label>
        <input
          {...register("age", { valueAsNumber: true })}
          type="number"
          placeholder="age"
          className="input input-bordered"
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors.age?.message}</span>
        </label>
      </div>
      <div className="form-control">
        <label className=" label" htmlFor="phone">
          <span className="label-text">Phone</span>
        </label>
        <input
          {...register("phone")}
          type="text"
          placeholder="phone"
          className="input input-bordered"
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors.phone?.message}</span>
        </label>
      </div>
      <div className="form-control">
        <label className=" label" htmlFor="social-media">
          <span className="label-text">Social Media</span>
        </label>
        {fields.map((item, index) => (
          <div key={item.id} className=" flex gap-2 items-center">
            <input {...register(`socialMedias.${index}`)} className="input input-bordered" />
            <button type="button" className="btn btn-sm btn-error" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-sm btn-primary my-3"
          onClick={() => append({ value: "" })}>
          Add Social Media
        </button>
      </div>
      <div className="form-control">
        <button type="submit" className=" btn btn-success" disabled={isPending}>
          Save
        </button>
      </div>
    </form>
  );
};
export default UpdateUserProfile;
