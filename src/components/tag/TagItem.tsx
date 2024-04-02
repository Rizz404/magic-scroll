import { Tag } from "@/types/Tag";

interface TagItemProps {
  tag: Tag;
  isSelected: boolean;
  onClick: () => void;
}

const TagItem = ({ tag, isSelected, onClick }: TagItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`badge badge-primary cursor-pointer ${isSelected ? "badge-outline" : ""}`}>
      {tag.name}
    </div>
  );
};
export default TagItem;
