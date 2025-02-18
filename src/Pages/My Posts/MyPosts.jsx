import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyPosts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);

    const { data = [], refetch } = useQuery({
        queryKey: ["userDetails", user?.email, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/${user?.email}?skip=${currentPage}&limit=${itemsPerPage}`);
            setNumberOfPages(Math.ceil(res.data.totalPosts / itemsPerPage));
            return ({ userPosts: res.data.result });
        },
    });

    const { userPosts } = data;
    const pages = [...Array(numberOfPages).keys()]
    // console.log(pages)
    const handleDeletePost = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                 const res = await axiosSecure.delete(`/posts/${id}`);
                if (res.data.deletedCount) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
                
            }
        });
    };

    if (userPosts) {
        if (userPosts.length === 0) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <h2 className="text-2xl font-semibold text-gray-500">
                        You have no posts yet.
                    </h2>
                </div>
            );
        }

        if (userPosts.length > 0) {
            return (
                <div className=" mx-auto p-8">
                    <h2 className="text-3xl font-bold text-blue-600 mb-8">My Posts</h2>
                    <div className='flex flex-wrap justify-left mt-10 gap-1'>
                        <button onClick={() => { (pages.includes(currentPage - 1)) && setCurrentPage(currentPage - 1) }} className='btn bg-blue-400 btn-sm'> {"<<"}</button>
                        {pages.map(page => <button key={page} onClick={() => { setCurrentPage(page) }} className={` btn btn-sm ${(currentPage === page) ? 'bg-blue-400 border-2 border-solid border-blue-800' : 'bg-blue-400'}`}>{page + 1}</button>)
                        }
                        <button onClick={() => { (pages.includes(currentPage + 1)) && setCurrentPage(currentPage + 1) }} className='btn bg-blue-400 btn-sm'> {`>>`}</button>
                    </div>
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                        <table className="table w-full border-collapse border border-blue-400">

                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="px-6 py-4 border border-blue-400">#</th>
                                    <th className="px-6 py-4 border border-blue-400">Title</th>
                                    <th className="px-6 py-4 border border-blue-400">Votes</th>
                                    <th className="px-6 py-4 border border-blue-400">Actions</th>
                                </tr>
                            </thead>


                            <tbody className="text-center">
                                {userPosts.map((post, idx) => (
                                    <tr
                                        key={post._id}
                                        className="hover:bg-gray-100 transition duration-150"
                                    >
                                        <td className="px-6 py-4 border border-blue-400">
                                            {idx + 1}
                                        </td>
                                        <td className="px-6 py-4 border border-blue-400">
                                            {post.postTitle}
                                        </td>
                                        <td className="px-6 py-4 border border-blue-400">
                                            <div className="flex justify-center items-center gap-2">

                                                <button
                                                    className="btn btn-sm bg-green-100 text-green-600 hover:bg-green-200 flex items-center gap-1"
                                                // onClick={() => console.log(`Upvoted: ${post._id}`)}
                                                >
                                                    {post.postUpVote} <BiSolidUpvote />
                                                </button>


                                                <button
                                                    className="btn btn-sm bg-red-100 text-red-600 hover:bg-red-200 flex items-center gap-1"
                                                // onClick={() => console.log(`Downvoted: ${post._id}`)}
                                                >
                                                    {post.postDownVote} <BiSolidDownvote />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border border-blue-400">
                                            <div className="flex justify-center items-center gap-4">

                                                <Link
                                                    to={`/dashboard/comments/${post._id}`}
                                                    className="btn btn-sm bg-blue-500 text-white hover:bg-blue-700 px-4"
                                                >
                                                    Comments
                                                </Link>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDeletePost(post._id)}
                                                    className="btn btn-sm bg-red-500 text-white hover:bg-red-700 px-4"
                                                >
                                                    <MdDeleteSweep className="text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
};

export default MyPosts;
