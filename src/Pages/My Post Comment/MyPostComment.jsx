import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { BiSolidDownvote, BiSolidUpvote } from 'react-icons/bi';
import { FaShare } from 'react-icons/fa';

const MyPostComment = () => {
    const params = useParams();
    const axiosSecure = useAxiosSecure();
    const { data = [] } = useQuery({
        queryKey: ['postDetails','postComments'],
        queryFn: async () => {
            const [postRes, postCommentRes] = await Promise.all([
                axiosSecure.get(`/post/${params.id}`),
                axiosSecure.get(`/comments/${params.id}`)
            ])
            return { postDetails: postRes.data, postComments: postCommentRes.data }
        }
    });
    const {postDetails, postComments} = data;
    // console.log(postDetails)
    if (postDetails) {
        return (
            <div>
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-xl font-semibold mb-4">My Recent Posts</h2>
                    <div className="space-y-6">
                        <div className="bg-white shadow-md rounded-lg p-2 flex flex-col gap-4"
                        >
                            {/* Author Info */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={postDetails.authorImage}
                                    alt="Author"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <h3 className="font-medium">{postDetails.authorName}</h3>
                                    <p className="text-sm text-gray-500">
                                        {/* Convert postTime to local time */}
                                        {new Date(postDetails.postTime).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Post Info */}
                            <div>
                                <h3 className="text-lg font-semibold">{postDetails.postTitle}</h3>
                                <span className="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full">
                                    #{postDetails.postTag}
                                </span>
                                <p className="text-gray-700">{postDetails.postDescription}</p>

                            </div>

                            {/* Post Actions */}
                            <div className="flex items-center gap-1 mt-4">
                                <button className="bg-blue-500 text-white px-4 py-2 btn">
                                    Comment
                                </button>
                                <button className="text-green-600 hover:text-green-500 flex items-center gap-1 btn">
                                    {postDetails.postUpVote} <BiSolidUpvote />
                                </button>
                                <button className="text-red-600 hover:text-red-500 flex items-center gap-1 btn">
                                    {postDetails.postDownVote} <BiSolidDownvote />
                                </button>
                                <button className="text-blue-600 hover:text-blue-500 btn">
                                    <FaShare />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default MyPostComment;