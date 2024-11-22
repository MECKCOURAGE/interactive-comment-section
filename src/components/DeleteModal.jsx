import { createPortal } from "react-dom";

function DeleteModal({ onClose, onConfirm, commentId }) {
    return createPortal(
        <div
            className="fixed inset-0 w-full h-screen bg-black bg-opacity-75 z-50 flex items-center justify-center"
            onClick={onClose} 
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-[305px] space-y-2"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold text-neutral-darkBlue">Delete Comment</h2>
                <p className="text-sm text-neutral-grayBlue">
                    Are you sure you want to delete this <br />comment? This will remove the comment <br /> and the action cannot be undone.
                </p>
                <div className="flex space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-neutral-grayBlue text-white rounded-lg text-sm hover:bg-neutral-darkBlue "
                    >
                        NO, CANCEL
                    </button>
                    <button
                        onClick={() => onConfirm(commentId)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                    >
                        YES, DELETE
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );
}

export default DeleteModal;
