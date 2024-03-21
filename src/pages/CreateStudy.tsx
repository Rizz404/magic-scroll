import { StudySchema } from "@/lib/zod/study";
import { useCreateStudy } from "@/services/study";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const CreateStudy = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<StudySchema>({ resolver: zodResolver(StudySchema) });

  const { mutate, isPending } = useCreateStudy({});

  const onSubmit: SubmitHandler<StudySchema> = (data) => {
    mutate({ ...data });
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" max-w-md mx-auto mt-10">
      <div className="form-control">
        <label htmlFor="name" className=" label">
          <span className=" label-text">Name</span>
        </label>
        <input
          type="text"
          {...register("name")}
          placeholder="name"
          className=" input input-bordered"
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors.name?.message}</span>
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="name" className=" label">
          <span className=" label-text">Image</span>
        </label>
        <input
          type="text"
          {...register("image")}
          placeholder="image"
          className=" input input-bordered"
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors.image?.message}</span>
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="description" className=" label">
          <span className=" label-text">Description</span>
        </label>
        <input
          type="text"
          {...register("description")}
          placeholder="description"
          className=" input input-bordered"
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors.description?.message}</span>
        </label>
      </div>

      <div className="form-control">
        <button type="submit" className="btn btn-success" disabled={isSubmitting || isPending}>
          Save
        </button>
      </div>
    </form>
  );
};
export default CreateStudy;
