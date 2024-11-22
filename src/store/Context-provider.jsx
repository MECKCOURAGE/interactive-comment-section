import { createContext, useState } from "react";
import commentData from "../data.json";

export const CommentContext = createContext({
    data: {},
    newComment: false,
    increment: () => { },
    decrement: () => { },
    addReply: () => { },
    deleteComment: () => { },
    editComment: () => { },
    modal: false,
    settingModalActive: () => {},
    activeCommentId: null


});

export default function CommentContextProvider({ children }) {
    const [comments, setComments] = useState(commentData.comments);
    const [modal, setModal] = useState(false);
    const [activeCommentId, setActiveCommentId] = useState(null);

    const initialScores = commentData.comments.reduce((acc, comment) => {
        acc[comment.id] = comment.score;
        comment.replies.forEach(reply => {
            acc[reply.id] = reply.score;
        });
        return acc;
    }, {});
    const [scores, setScores] = useState(initialScores);

    function settingModalActive(commentId = null){
        setModal((prev) => !prev);
        setActiveCommentId(commentId);

    }



    function increment(id) {
        setScores(prevScores => ({
            ...prevScores,
            [id]: (prevScores[id] || 0) + 1
        }));
    }



    function decrement(id) {
        setScores(prevScores => ({
            ...prevScores,
            [id]: Math.max((prevScores[id] || 0) - 1, 0)
        }));
    }



    function addReply(commentId, reply) {
        reply = { ...reply, score: reply.score || 0, replies: [] };

        function addReplyRecursively(comments, commentId) {
            return comments.map(comment => {
                if (comment.id === commentId) {
                    return { ...comment, replies: [...comment.replies, reply] };
                } else if (comment.replies && comment.replies.length > 0) {
                    return { ...comment, replies: addReplyRecursively(comment.replies, commentId) };
                }
                return comment;
            });
        }

        setComments(prevComments => {
            if (commentId === undefined) {
                return [...prevComments, reply];
            } else {
                return addReplyRecursively(prevComments, commentId);
            }
        });
        setScores(prevScores => ({
            ...prevScores,
            [reply.id]: reply.score
        }));
    }
    function deleteComment(id) {
        function deleteRecursively(comments, id) {
            return comments
                .map(comment => {
                    if (comment.id === id) return null; 
                    if (comment.replies && comment.replies.length > 0) {
                        return {
                            ...comment,
                            replies: deleteRecursively(comment.replies, id)
                        };
                    }
                    return comment;
                })
                .filter(comment => comment !== null); 
        }

        setComments(prevComments => deleteRecursively(prevComments, id));
        setScores(prevScores => {
            const updatedScores = { ...prevScores };
            delete updatedScores[id];
            return updatedScores;
        });
    }

    function editComment(id, updatedContent) {
        function editRecursively(comments, id, updatedContent) {
            return comments.map(comment => {
                if (comment.id === id) {
                    return { ...comment, content: updatedContent };
                } else if (comment.replies && comment.replies.length > 0) {
                    return {
                        ...comment,
                        replies: editRecursively(comment.replies, id, updatedContent)
                    };
                }
                return comment;
            });
        }

        setComments(prevComments => editRecursively(prevComments, id, updatedContent));
    }



    const ctxValue = {
        data: { currentUser: commentData.currentUser, comments },
        scores,
        increment,
        decrement,
        addReply,
        deleteComment, 
        editComment,
        modal,
        settingModalActive,
        activeCommentId
    };

    return (
        <CommentContext.Provider value={ctxValue}>
            {children}
        </CommentContext.Provider>
    );
}
