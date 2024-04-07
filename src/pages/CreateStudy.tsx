import { StudySchema } from "@/lib/zod/study";
import { useCreateStudy } from "@/services/study";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const CreateStudy = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<StudySchema>({});

  const { mutate, isPending } = useCreateStudy({ navigateTo: "/" });

  const onSubmit: SubmitHandler<StudySchema> = (data) => {
    mutate(data);
    console.log(data);
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
          <label htmlFor="image" className=" label">
            <span className=" label-text">Image</span>
          </label>
          <input type="file" {...register("image")} className=" file-input input-bordered" />
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
export default CreateStudy;
