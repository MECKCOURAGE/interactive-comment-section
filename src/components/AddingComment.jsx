import { useContext, useState } from "react";
import { CommentContext } from "../store/Context-provider";

export default function AddingComment({ replyTo, commentId, onSubmit }) {
    const { data, addReply } = useContext(CommentContext);
    const [text, setText] = useState("");

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!text.trim()) return;

        const newReply = {
            id: Date.now(),
            content: text,
            createdAt: "just now",
            score: 0,
            replyingTo: replyTo ? replyTo : "",
            user: {
                image: data.currentUser.image,
                username: data.currentUser.username,
            }
        };

        addReply(commentId, newReply);
        setText("");
        onSubmit && onSubmit();
    };


    return (
        <form onSubmit={handleSubmit} className="flex p-4 bg-white rounded-lg border-2 border-neutral-lightGray w-full max-w-2xl">
            <ul className="md:flex gap-4 w-full">
                <li className="md:block hidden">
                    <img
                        src={data.currentUser.image.png}
                        alt={data.currentUser.username}
                        className="w-[30px] h-[30px] rounded-full"
                    />
                </li>
                <li className="flex-1 relative">
                    <textarea
                        value={text}
                        onChange={handleChange}
                        placeholder={replyTo ? "" : "Add a comment..."}
                        className="border border-neutral-lightGray rounded-lg w-full h-[74px] p-2 placeholder:text-neutral-grayishBlue text-sm "
                    />
                </li>
                <li className="md:hidden mt-[10px] flex justify-between">
                    <img
                        src={data.currentUser.image.png}
                        alt={data.currentUser.username}
                        className="w-[30px] h-[30px] rounded-full"
                    />
                    <button type="submit" className="bg-primary-blue rounded-lg px-5 py-2 font-sans text-xs hover:opacity-50 transition duration-300 text-white">
                        SEND
                    </button>

                </li>

                <li className="md:block hidden">
                    <button type="submit" className="bg-primary-blue rounded-lg px-5 py-2 font-sans text-xs hover:opacity-50 transition duration-300 text-white">
                        SEND
                    </button>
                </li>
            </ul>
        </form>
    );
}
