import { TagSchema } from "@/lib/zod/tag";
import { useCreateTagMutation } from "@/services/tag";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const CreateTag = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TagSchema>({ resolver: zodResolver(TagSchema) });

  const { mutate, isPending } = useCreateTagMutation();

  const onSubmit: SubmitHandler<TagSchema> = (data) => {
    mutate({ ...data });
    reset();
  };
  return (
    <>
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

      <DevTool control={control} />
    </>
  );
};
export default CreateTag;
