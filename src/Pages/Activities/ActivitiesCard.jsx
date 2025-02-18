import React from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ActivitiesCard = ({ reportsData, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const handleDeletePost = async (reportsData) => {
        // console.log(reportsData);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/reports-post/${reportsData._id}`)
                if (res.data.deletePost.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Post has been deleted.",
                        icon: "success"
                    });
                    refetch();

                }
                else {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Opsss ! Somthing Is Wrong",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            }
        });
    }
    return (
        <tr>
            <td className="border border-blue-400">{reportsData.postTitle}</td>
            <td className="border border-blue-400">{reportsData.commentDetails}</td>
            <td className="border border-blue-400">{reportsData.commentUserName}</td>
            <td className="border border-blue-400">{reportsData.feedback}</td>
            <td className="border border-blue-400 space-x-2">
                {/* Action Buttons */}
                <Link to={`/comments/${reportsData.postId}`}
                    className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                // onClick={() => console.log(`See post: ${reportsData.postId}`)}
                >
                    See Post
                </Link>
                <button
                    className="btn btn-sm bg-red-500 hover:bg-red-700 text-white"
                    onClick={() => handleDeletePost(reportsData)}
                >
                    Delete Post
                </button>
                {/* <button
                    className="btn btn-sm bg-yellow-500 hover:bg-yellow-700 text-white"
                    onClick={() => console.log(`Delete report: ${reportsData._id}`)}
                >
                    Delete Report
                </button> */}
            </td>
        </tr>
    );
};

export default ActivitiesCard;
