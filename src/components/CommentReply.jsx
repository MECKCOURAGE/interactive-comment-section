import ReplyButton from "./ReplyButton";
import { useContext, useState } from "react";
import { CommentContext } from "../store/Context-provider";
import EditDeleteButtons from "./EditDeleteButtons";
import AddingComment from "./AddingComment";

export default function CommentReply({ reply }) {
    const { data, scores, increment, decrement, editComment } = useContext(CommentContext);
    const [newComment, setNewComment] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(reply.content);

    function settingCommentSpace() {
        setNewComment(prevState => !prevState);
    }

    function handleEditSave() {
        editComment(reply.id, updatedContent);
        setIsEditing(false);
    }

    return (
        <>
            <div className="space-y-3 border border-neutral-lightGray w-full">
                <div className="flex md:flex-row flex-col p-4 bg-white rounded-lg">
                    <div className=" flex md:order-1 order-2 md:flex-col md:pl-0 pl-4 justify-between mt-[9px] md:mt-[0px]">
                        <li className="flex md:flex-col flex-row h-[25px] w-[70px] items-center bg-neutral-lightGray md:h-[85px] md:w-[35px] rounded-[9px] justify-evenly">
                            <button onClick={() => increment(reply.id)}>
                                <p className="text-lg text-primary-lightBlue hover:text-primary-blue">+</p>
                            </button>
                            <h1 className="text-primary-blue font-bold text-1g">
                                {scores[reply.id] !== undefined ? scores[reply.id] : reply.score}
                            </h1>
                            <button onClick={() => decrement(reply.id)}>
                                <p className="text-2xl text-primary-lightBlue hover:text-primary-blue">-</p>
                            </button>
                        </li>

                        <li className="block md:hidden">
                            {reply.user.username === data.currentUser.username ? (
                                <EditDeleteButtons
                                    commentId={reply.id}
                                    editing={() => setIsEditing(true)}
                                />
                            ) : (
                                <ReplyButton onHit={settingCommentSpace} />
                            )}
                        </li>
                    </div>

                    <div className="ml-[17px] w-full md:order-2 order-1">
                        <ul className="flex justify-between">

                            <div className="flex space-x-3">
                                <li>
                                    <img
                                        src={reply.user.image.png}
                                        alt={reply.user.username}
                                        className="w-[26px] h-[26px] rounded-full"
                                    />
                                </li>
                                <li>
                                    <strong className="text-sm text-neutral-darkBlue font-sans font-bold">
                                        {reply.user.username}
                                    </strong>
                                </li>
                                {reply.user.username === data.currentUser.username && (
                                    <li>
                                        <div className="pl-[4px] pr-[4px] pt-[1px] pb-[1px] mt-[4px] rounded-sm text-xs text-white font-light bg-primary-blue">
                                            you
                                        </div>
                                    </li>
                                )}
                                <li className="text-sm text-neutral-grayBlue mt-[2px]">
                                    {reply.createdAt}
                                </li>
                            </div>
                            <li className="hidden md:block">
                                {reply.user.username === data.currentUser.username ? (
                                    <EditDeleteButtons
                                        commentId={reply.id}
                                        editing={() => setIsEditing(true)}
                                    />
                                ) : (
                                    <ReplyButton onHit={settingCommentSpace} />
                                )}
                            </li>
                        </ul>
                        <div className="mt-[9px]">
                            {isEditing ? (
                                <div>
                                    <textarea
                                        value={updatedContent}
                                        onChange={(e) => setUpdatedContent(e.target.value)}
                                        className="border border-neutral-lightGray rounded-lg w-full p-2 text-sm"
                                    />
                                    <div className="mt-2">
                                        <button
                                            onClick={handleEditSave}
                                            className="bg-primary-blue text-white px-4 py-1 rounded-lg hover:opacity-80"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="ml-2 bg-neutral-lightGray text-neutral-darkBlue px-4 py-1 rounded-lg hover:opacity-80"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-neutral-grayBlue text-sm font-sans font-light">
                                    <strong className="font-semibold text-primary-blue">
                                        @{reply.replyingTo}
                                    </strong>{" "}
                                    {reply.content}
                                </p>
                            )}
                        </div>
                    </div>
                </div>


                {newComment && (
                    <AddingComment
                        replyTo={reply.user.username}
                        commentId={reply.id}
                        onSubmit={() => setNewComment(false)}
                    />
                )}

                {reply.replies && reply.replies.length > 0 && (
                    <div className="md:ml-[25px] md:pl-[25px] ml-[0px] pl-[15px] border-l border-primary-lightBlue space-y-3">
                        {reply.replies.map((repli) => (
                            <CommentReply key={repli.id} reply={repli} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
