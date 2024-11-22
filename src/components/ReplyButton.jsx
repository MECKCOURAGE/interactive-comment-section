export default function ReplyButton({ onHit }) {

    return (<button  className = "hover:opacity-50 transition duration-300" onClick={onHit}>
        <div className="flex">
            
            <div>
                <svg
                    className="h-[13px] w-[14px] mt-[5px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                        fill="#5357B6"
                    
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <h1 className="text-primary-blue text-xs font-bold ml-[3px] mt-[2px] hover:bg-transparent">Reply</h1>

        </div>
    </button>)

}