import { useContext } from "react"; 
import { CommentContext } from "../store/Context-provider";
import Comment from "../components/Comment";
import AddingComment from "../components/AddingComment";

export default function OnlyPage() {
  const { data } = useContext(CommentContext);

  return (
    <div className="flex justify-center px-4">
      <div className="flex flex-col items-center md:space-y-3 space-y-2 w-full max-w-[618px]">
        {data?.comments?.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
        <AddingComment />
      </div>
    </div>
  );
}
