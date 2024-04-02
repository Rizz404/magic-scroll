import { useAddOrRemoveNoteInteraction } from "@/services/note";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {
  TbArrowBigDown,
  TbArrowBigDownFilled,
  TbArrowBigUp,
  TbArrowBigUpFilled,
  TbPinned,
  TbPinnedFilled,
} from "react-icons/tb";

interface NoteInteractionProps {
  noteId: string;
  isAlreadyInteract: boolean;
  count: number;
}

export const UpvoteButton = ({ noteId, isAlreadyInteract, count }: NoteInteractionProps) => {
  const { mutate, isPending } = useAddOrRemoveNoteInteraction({ interaction: "upvote" });

  const handleUpvote = () => {
    mutate(noteId);
  };

  return (
    <div className=" flex gap-1 items-center">
      {isPending ? (
        <span className="loading"></span>
      ) : isAlreadyInteract ? (
        <TbArrowBigUpFilled
          className="text-xl text-green-800 hover:cursor-pointer"
          onClick={handleUpvote}
        />
      ) : (
        <TbArrowBigUp
          className="text-xl text-green-800 hover:cursor-pointer"
          onClick={handleUpvote}
        />
      )}

      <p className=" text-md text-slate-800">{count}</p>
    </div>
  );
};

export const DownvoteButton = ({ noteId, isAlreadyInteract, count }: NoteInteractionProps) => {
  const { mutate, isPending } = useAddOrRemoveNoteInteraction({ interaction: "downvote" });

  const handleDownvote = () => {
    mutate(noteId);
  };

  return (
    <div className=" flex gap-1 items-center">
      {isPending ? (
        <span className="loading"></span>
      ) : isAlreadyInteract ? (
        <TbArrowBigDownFilled
          className="text-xl text-red-800 hover:cursor-pointer"
          onClick={handleDownvote}
        />
      ) : (
        <TbArrowBigDown
          className="text-xl text-red-800 hover:cursor-pointer"
          onClick={handleDownvote}
        />
      )}
      <p className=" text-md text-slate-800">{count}</p>
    </div>
  );
};
export const FavoriteButton = ({ noteId, isAlreadyInteract, count }: NoteInteractionProps) => {
  const { mutate, isPending } = useAddOrRemoveNoteInteraction({ interaction: "favorite" });

  const handleFavorite = () => {
    mutate(noteId);
  };

  return (
    <div className=" flex gap-1 items-center">
      {isPending ? (
        <span className="loading"></span>
      ) : isAlreadyInteract ? (
        <MdFavorite
          className="text-xl text-red-500 hover:cursor-pointer"
          onClick={handleFavorite}
        />
      ) : (
        <MdFavoriteBorder
          className="text-xl text-red-500 hover:cursor-pointer"
          onClick={handleFavorite}
        />
      )}
      <p className=" text-md text-slate-800">{count}</p>
    </div>
  );
};
export const SaveButton = ({ noteId, isAlreadyInteract, count }: NoteInteractionProps) => {
  const { mutate, isPending } = useAddOrRemoveNoteInteraction({ interaction: "save" });

  const handleSave = () => {
    mutate(noteId);
  };

  return (
    <div className=" flex gap-1 items-center">
      {isPending ? (
        <span className="loading"></span>
      ) : isAlreadyInteract ? (
        <TbPinnedFilled
          className="text-xl text-blue-800 hover:cursor-pointer"
          onClick={handleSave}
        />
      ) : (
        <TbPinned className="text-xl text-blue-800 hover:cursor-pointer" onClick={handleSave} />
      )}
      <p className=" text-md text-slate-800">{count}</p>
    </div>
  );
};
