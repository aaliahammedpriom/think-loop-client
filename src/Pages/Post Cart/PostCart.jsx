import React, { useEffect, useState } from 'react';
import { BiSolidDownvote, BiSolidUpvote } from 'react-icons/bi';
import { FaCommentDots, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PostCart = ({ post }) => {
    const [commentCount , setCommentCount] = useState(0)
    const axiosPublic = useAxiosSecure();
    useEffect(()=>{
        axiosPublic.get(`/comments-count/${post._id}`)
        .then(res=>{
            setCommentCount(res.data.commentCount)
        })
    },[post,post._id])
    // console.log(commentCount)
    return (
        <div
            key={post.id}
            className="bg-white shadow-md rounded-lg p-2 flex flex-col gap-4"
        >
            {/* Author Info */}
            <div className="flex items-center gap-4">
                <img
                    src={post.authorImage}
                    alt="Author"
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <h3 className="font-medium">{post.authorName}</h3>
                    <p className="text-sm text-gray-500">
                        {/* Convert postTime to local time */}
                        {new Date(post.postTime).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Post Info */}
            <div className=''>
                <h3 className="text-lg font-semibold">{post.postTitle}</h3>
                <span className="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full">
                    #{post.postTag}
                </span>

            </div>

            {/* Post Actions */}
            <div className="flex flex-wrap justify-evenly items-center gap-1 mt-4">
                <button className="text-blue-400 px-4 py-2 btn">
                 {commentCount} <FaCommentDots />
                </button>
                <button className="text-green-600 hover:text-green-500 flex items-center gap-1 btn">
                    {post.postUpVote} <BiSolidUpvote />
                </button>
                <button className="text-red-600 hover:text-red-500 flex items-center gap-1 btn">
                    {post.postDownVote} <BiSolidDownvote />
                </button>
                
                <Link to={`/comments/${post._id}`} className="text-blue-400 hover:text-blue-500 btn">
                    View
                </Link >
            </div>
        </div>
    );
};

export default PostCart;