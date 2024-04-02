import { Note } from "@/types/Note";
import { DownvoteButton, FavoriteButton, SaveButton, UpvoteButton } from "./NoteInteraction";
import { Link } from "react-router-dom";

const NoteCard = ({ ...note }: Note) => {
  const hasNoteInteraction = note.noteInteraction && note.noteInteraction.length > 0;
  const noteInteraction = hasNoteInteraction ? note.noteInteraction[0] : false;

  const getIsAlreadyInteract = (
    interaction: "isUpvoted" | "isDownvoted" | "isFavorited" | "isSaved"
  ) => {
    if (!hasNoteInteraction) return false;
    return noteInteraction && noteInteraction[interaction];
  };

  return (
    <div className="even:bg-gray-400 odd:bg-blue-400 rounded shadow overflow-hidden">
      <div className="flex justify-between flex-row-reverse p-2">
        <span>{note.userId}</span>
      </div>
      <img
        src={note.thumbnailImage as string}
        alt={note.thumbnailImage as string}
        className="w-full object-cover"
      />
      <div className="p-4">
        <h3 className="py-2 mb-2 border-b font-bold hover:text-red-300">
          <Link to={`/note/${note.id}`}>{note.title}</Link>
        </h3>
        <span className="text-sm block mb-2">{note.content}</span>
        <div className=" flex justify-between items-center py-2 px-4 border rounded-md">
          <UpvoteButton
            noteId={note.id}
            isAlreadyInteract={getIsAlreadyInteract("isUpvoted")}
            count={note.upvotedCount}
          />
          <DownvoteButton
            noteId={note.id}
            isAlreadyInteract={getIsAlreadyInteract("isDownvoted")}
            count={note.downvotedCount}
          />
          <FavoriteButton
            noteId={note.id}
            isAlreadyInteract={getIsAlreadyInteract("isFavorited")}
            count={note.favoritedCount}
          />
          <SaveButton
            noteId={note.id}
            isAlreadyInteract={getIsAlreadyInteract("isSaved")}
            count={note.savedCount}
          />
        </div>
      </div>
    </div>
  );
};
export default NoteCard;
