import {
  DownvoteButton,
  FavoriteButton,
  SaveButton,
  UpvoteButton,
} from "@/components/note/NoteInteraction";
import { useGetNoteById } from "@/services/note";
import { useFollowOrUnfollowUserMutation, useGetUserByIdQuery } from "@/services/user";
import { useState } from "react";
import { useParams } from "react-router-dom";

const NoteDetailPage = () => {
  const { noteId } = useParams();
  const [edit, setEdit] = useState(false);

  const { data: note, isLoading, isError, error } = useGetNoteById({ id: noteId! });
  const { data: user } = useGetUserByIdQuery({ id: note?.userId || "" });
  const { mutate, isPending } = useFollowOrUnfollowUserMutation({ id: note?.userId || "" });

  if (isLoading) {
    return <span>Loading</span>;
  }
  if (isError) {
    return <span>{error.message}</span>;
  }

  if (!note) {
    return <span>No note</span>;
  }

  return (
    <div className=" bg-slate-400 rounded-sm shadowW">
      <div className="px-4 pb-3">
        <div className="flex justify-between items-center py-2">
          <div className=" border-b py-2">
            <h2 className=" text-blue-900 font-semibold text-5xl mb-1">{note.title}</h2>
            <div className=" flex gap-3 items-center">
              <img
                src={"https://i.pinimg.com/236x/db/ca/86/dbca86ad2246775a1974523c518765aa.jpg"}
                alt={"https://i.pinimg.com/236x/db/ca/86/dbca86ad2246775a1974523c518765aa.jpg"}
                className=" rounded-full w-10"
              />
              <div className="text-black">
                <div className="font-semibold mb-1">
                  <span className="me-2">{user?.username}</span>
                  <button
                    type="button"
                    className=" btn btn-xs btn-success"
                    onClick={() => mutate()}
                    disabled={isPending}>
                    follow
                  </button>
                </div>

                <h6 className="text-sm">
                  Created At: {new Date(note.createdAt).toLocaleDateString()}
                </h6>
              </div>
            </div>
          </div>
          <img
            src={note.thumbnailImage as string}
            alt={note.thumbnailImage as string}
            className=" rounded-md w-16 cursor-pointer"
          />
        </div>
        <div className="">
          <textarea
            className=" textarea textarea-lg w-full"
            value={note.content}
            disabled={!edit}
          />
        </div>
        <div className=" border flex justify-between items-center px-4 py-2 rounded-md">
          <UpvoteButton
            noteId={note.id}
            isAlreadyInteract={note.noteInteraction[0].isUpvoted}
            count={note.upvotedCount}
          />
          <DownvoteButton
            noteId={note.id}
            isAlreadyInteract={note.noteInteraction[0].isDownvoted}
            count={note.downvotedCount}
          />
          <FavoriteButton
            noteId={note.id}
            isAlreadyInteract={note.noteInteraction[0].isFavorited}
            count={note.favoritedCount}
          />
          <SaveButton
            noteId={note.id}
            isAlreadyInteract={note.noteInteraction[0].isSaved}
            count={note.savedCount}
          />
          <button
            type="button"
            className={`btn btn-primary btn-sm ${edit && "btn-active"}`}
            onClick={() => setEdit((prev) => !prev)}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
export default NoteDetailPage;
