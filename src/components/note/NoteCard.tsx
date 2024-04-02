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
      <div className="flex justify-between p-2">
        <span>{note.user.username}</span>
        {note.user.isVerified && <div className=" rounded-full bg-green-500 w-2"></div>}
      </div>
      <img
        src={note.thumbnailImage as string}
        alt={note.thumbnailImage as string}
        className="w-full object-cover"
      />
      <div className="p-4">
        <div className="border">
          <div className="flex gap-1 justify-end  rounded-badge">
            <img
              src={note.study.image?.toString()}
              alt={note.study.name}
              className="w-4 rounded-full"
            />
            <h6 className="">{note.study.name}</h6>
          </div>
        </div>
        <h3 className="py-2 mb-2 border-b font-bold hover:text-red-300">
          <Link to={`/note/${note.id}`}>{note.title}</Link>
        </h3>
        <span className="text-sm block mb-2">{note.content}</span>
        <div className="flex items-center flex-wrap mb-2">
          {note.tags.map((tag, index) => (
            <span className="btn btn-xs btn-outline text-black" key={index}>
              {tag.name}
            </span>
          ))}
        </div>
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
