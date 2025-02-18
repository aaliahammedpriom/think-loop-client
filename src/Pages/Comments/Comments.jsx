import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { BiSolidDownvote, BiSolidUpvote } from 'react-icons/bi';
import { FaCommentDots, FaShare } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import ReportHandle from '../Report Handle/ReportHandle';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import CommentDescription from './CommentDescription';
import Swal from 'sweetalert2';

const Comments = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = useAuth();
    const [isDisable, setIsDisable] = useState(true);

    const params = useParams();
    const axiosSecure = useAxiosSecure();

    const { data = [], refetch, } = useQuery({
        queryKey: ['postDetails', 'postComments', 'commentCountRes', 'userDetailsRes'],
        queryFn: async () => {
            const [postRes, postCommentRes, commentCountRes, userDetailsRes] = await Promise.all([
                axiosSecure.get(`/post/${params.id}`),
                axiosSecure.get(`/comments/${params.id}`),
                axiosSecure.get(`/comments-count/${params.id}`),
                axiosSecure.get(`/users/${user?.email}`)
            ])
            return { postDetails: postRes.data, postComments: postCommentRes.data, commentCount: commentCountRes.data.commentCount, userDetails: userDetailsRes.data }
        }
    });
    const { postDetails, postComments, commentCount, userDetails } = data;
    // console.log({isLoading, userDetails})

    const handleCommentSubmit = async (e, postDetails) => {
        e.preventDefault();
        if (user && user?.email) {
            const commentInfo = {
                commentDetails: e.target.comment.value,
                commentUserName: user?.displayName,
                commentUserEmail: user?.email,
                commentDate: new Date().toISOString(),
                postTitle: postDetails.postTitle,
                postId: postDetails._id
            }
            try {
                const res = await axiosSecure.post(`/comments`, commentInfo);
                console.log('Response:', res.data.massage);

                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Comment Successful",
                        showConfirmButton: false,
                        timer: 1000,
                    });
                    e.target.reset(); // Reset form
                    setIsDisable(true); // Disable button or UI element if needed
                    refetch(); // Refetch data if necessary
                }
                if (res.data.massage) {
                    Swal.fire({
                        position: "top",
                        icon: "error",
                        title: "Failed to Post Comment Reload Please",
                        text: res?.data?.massage || "Something went wrong. Please try again.",
                        showConfirmButton: true,
                    });

                }
            } catch (error) {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Failed to Post Comment Reload Please",
                    text: error.response?.data?.message || "Something went wrong. Please try again.",
                    showConfirmButton: true,
                });

            }


        }
        else {
            navigate('/joinus', { state: { from: { pathname: location.pathname } } });

        }
    }
    const handleChange = (e) => {
        if (e.target.value.length > 0) {
            setIsDisable(false)
        }
        else {
            setIsDisable(true)
        }
    }

    const handleUpVote = async () => {
        if (user && user?.email) {
            const upVoteInfo = {
                userId: userDetails?._id,
                postId: postDetails?._id
            }
            const res = await axiosSecure.post('/userupvote', upVoteInfo)
            if (res.data.success) {
                refetch();
            }
        }
        else {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Please Login First",
                showConfirmButton: false,
                timer: 1500
            });
        }



    }
    const handleDownVote = async () => {
        if (user && user?.email) {
            const downVoteInfo = {
                userId: userDetails?._id,
                postId: postDetails?._id
            }
            const res = await axiosSecure.post('/userdownvote', downVoteInfo)
            if (res.data.success) {
                refetch();
            }
        }
        else {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Please Login First",
                showConfirmButton: false,
                timer: 1500
            });
        }

    }
    const shareUrl = 'https://www.facebook.com/photo/?fbid=122108557670710228&set=gm.2039006446525736&idorvanity=1929396810820034';
    // console.log(params.id)
    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
            {/* post info */}
            <div >
                <h2 className="text-xl font-semibold mb-4">My Recent Posts</h2>
                <div className="space-y-6">
                    <div className="bg-white shadow-md rounded-lg p-2 flex flex-col gap-4"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={postDetails?.authorImage}
                                alt="Author"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h3 className="font-medium">{postDetails?.authorName}</h3>
                                <p className="text-sm text-gray-500">
                                    {/* Convert postTime to local time */}
                                    {new Date(postDetails?.postTime).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">{postDetails?.postTitle}</h3>
                            <span className="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full">
                                #{postDetails?.postTag}
                            </span>
                            <p className="text-gray-700">{postDetails?.postDescription}</p>

                        </div>

                        {/* Post Actions */}
                        <div className="flex items-center gap-1 mt-4">
                            <button className=" px-4 py-2 text-blue-400 btn">
                                ( {commentCount} ) <FaCommentDots />
                            </button>
                            <button onClick={handleUpVote} className="text-green-600 hover:text-green-500 flex items-center gap-1 btn">
                                {postDetails?.postUpVote} <BiSolidUpvote />
                            </button>
                            <button onClick={handleDownVote} className="text-red-600 hover:text-red-500 flex items-center gap-1 btn">
                                {postDetails?.postDownVote} <BiSolidDownvote />
                            </button>

                            <button className="text-blue-600 hover:text-blue-500 btn">
                                <FacebookShareButton
                                    url={`https://mellow-mandazi-3e1f97.netlify.app/comments/${params.id}`}
                                    quote="Check out this post!"
                                    hashtag="#ThinkLoop"
                                >
                                    <FacebookIcon size={32} round={true} />
                                </FacebookShareButton>
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* comment form */}
            {!(location.pathname.includes('/dashboard')) && <form onSubmit={(e) => handleCommentSubmit(e, postDetails)}>
                <label className="block text-gray-700 font-medium mb-1">
                    Comment
                </label>
                <textarea
                    name='comment'
                    onChange={handleChange}
                    placeholder="Enter post description"
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                ></textarea>
                <button disabled={isDisable} type='submit' className='btn bg-blue-400'>Submit</button>
            </form >}

            {/* comment view section */}
            {
                (postComments && postComments.length > 0) ?
                    <div className="overflow-x-auto">
                        <table className="table w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200 text-left px-4 py-2">
                                    <th >Comments</th>
                                    {
                                        (postDetails?.authorEmail === user?.email) && <th></th>
                                    }
                                </tr>

                            </thead>
                            <tbody className='grid grid-cols-1'>
                                {postComments.map((post, index) => (
                                    <tr key={index} className="hover:bg-gray-100 ">
                                        <td className="px-4 py-5">
                                            <div className='flex flex-col gap-1'>
                                                <p className="font-bold">{post.commentUserName}</p>
                                                <p className="text-sm">{post.commentUserEmail}</p>
                                                <p className="text-sm text-gray-500">{new Date(post.commentDate).toLocaleString()}</p>
                                                <div>
                                                    <CommentDescription commentDetails=
                                                        {post.commentDetails}></CommentDescription>
                                                    {/* <p className=" border p-2 text-gray-700">{post.commentDetails}</p> */}
                                                </div>
                                            </div>
                                        </td>
                                        {
                                            ((location.pathname.includes('/dashboard')) && postDetails?.authorEmail === user?.email) ?
                                                <ReportHandle post={post} refetch={refetch}></ReportHandle>
                                                : ''
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    : <div>Noo comment found</div>
            }
        </div>
    );
};

export default Comments;