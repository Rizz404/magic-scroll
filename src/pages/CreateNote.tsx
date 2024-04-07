import { NoteSchema } from "@/lib/zod/note";
import { useCreateNote } from "@/services/note";
import { useGetTags } from "@/services/tag";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

const CreateNote = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<NoteSchema>({
    defaultValues: { tags: [] },
  });

  const { mutate, isPending } = useCreateNote({ navigateTo: "/" });
  const { data, isLoading } = useGetTags({ page: 1, limit: 10 });
  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const onSubmit: SubmitHandler<NoteSchema> = (data) => {
    const formData = new FormData();

    // Mengisi judul
    formData.append("title", data.title);

    // Mengisi konten
    formData.append("content", data.content);

    // Mengisi thumbnailImage (file)
    if (data.thumbnailImage) {
      formData.append("thumbnailImage", data.thumbnailImage[0]);
    }

    // Mengisi attachments (array file)
    // Mengisi attachments (array file)
    if (Array.isArray(data.attachments)) {
      data.attachments.forEach((attachment) => {
        formData.append("attachments", attachment);
      });
    }

    // Mengisi isPrivate (boolean to string)
    formData.append("isPrivate", String(data.isPrivate));

    // Mengisi tags (array of object di stringify)
    formData.append(
      "tags",
      JSON.stringify(
        data.tags.map((tag) => {
          return { id: tag.id };
        })
      )
    );

    mutate(formData);
    console.log(formData);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=" max-w-md mx-auto mt-10">
        <div className="form-control">
          <label htmlFor="name" className=" label">
            <span className=" label-text">Title</span>
          </label>
          <input
            type="text"
            {...register("title")}
            placeholder="title"
            className=" input input-bordered"
          />
          <label className="label">
            <span className="label-text-alt text-error">{errors.title?.message}</span>
          </label>
        </div>

        <div className="form-control">
          <label htmlFor="content" className=" label">
            <span className=" label-text">Content</span>
          </label>
          <textarea
            {...register("content")}
            placeholder="content"
            className=" textarea textarea-bordered"
          />
          <label className="label">
            <span className="label-text-alt text-error">{errors.content?.message}</span>
          </label>
        </div>

        <div className="form-control">
          <label htmlFor="thumbnailImage" className=" label">
            <span className=" label-text">thumbnailImage</span>
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("thumbnailImage")}
            placeholder="thumbnailImage"
            className=" file-input input-bordered"
          />
          <label className="label">
            <span className="label-text-alt text-error">{errors.thumbnailImage?.message}</span>
          </label>
        </div>

        <div className="form-control">
          <label htmlFor="attachments" className=" label">
            <span className=" label-text">attachments</span>
          </label>
          <input
            type="file"
            multiple
            max={7}
            {...register("attachments")}
            placeholder="attachments"
            className=" file-input input-bordered"
          />
          <label className="label">
            <span className="label-text-alt text-error">{errors.attachments?.message}</span>
          </label>
        </div>

        <div className=" form-control">
          <label htmlFor="isPrivate" className=" label">
            <span className=" label-text">Private Note</span>
          </label>
          <input
            type="checkbox"
            {...register("isPrivate")}
            placeholder="isPrivate"
            className=" checkbox input-bordered"
          />
          <label className="label">
            <span className="label-text-alt text-error">{errors.isPrivate?.message}</span>
          </label>
        </div>

        <div className="form-control mb-3">
          {isLoading ? (
            <p>Loading tags...</p>
          ) : (
            <>
              <h3>Tags</h3>
              {tagFields.map((field, index) => (
                <div key={field.id}>
                  <select {...register(`tags.${index}.id`)}>
                    <option value="">Select a tag</option>
                    {data?.data.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={() => removeTag(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => appendTag({ id: "" })}>
                Add Tag
              </button>
            </>
          )}
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
export default CreateNote;
