import React, { useState } from "react";

const CommentDescription = ({ commentDetails }) => {
    const [showModal, setShowModal] = useState(false);

   

    const firstPart = commentDetails.slice(0, 20); // First 20 characters
    const restPart = commentDetails.slice(20);    // Rest of the string
    return (
        <>
            <p>{firstPart}{showModal? restPart: ""}</p>
            {restPart && <button onClick={()=>setShowModal(!showModal)} className="text-blue-500 ">{showModal? "<< See Less" : "See More >>"}</button>}
        </>
    )
};

export default CommentDescription;
