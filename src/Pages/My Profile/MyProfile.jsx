import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { MdWorkspacePremium } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { FaLayerGroup, FaSadTear, FaShare, FaUsers } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { TfiComments } from "react-icons/tfi";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Link } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const MyProfile = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();
  const [isDisable, setIsDisable] = useState(true);
  const { data = [], isPending } = useQuery({
    queryKey: ["userDetails", user?.email],
    queryFn: async () => {
      const [postRes, userRes, statsRes] = await Promise.all([
        axiosSecure.get(`/posts/${user?.email}?limit=3`),
        axiosSecure.get(`/users/${user?.email}`),
       isAdmin && axiosSecure.get(`/admin-stats`),
      ]);
      return {
        userPosts: postRes.data.result,
        userDetails: userRes.data,
        statsData: statsRes.data,
      };
    },
  });

  const { userPosts, userDetails, statsData } = data;

  const handleAddTag = async (e) => {
    e.preventDefault();
    const tagValue = e.target.comment.value.trim();
    if (user?.email && tagValue) {
      const tagInfo = { tag: tagValue.toUpperCase() };
      const res = await axiosSecure.post(`/tags`, tagInfo);
      if (res.data.insertedId) {
        alert("Tag Added Successfully");
      }
    } else {
      alert("Please log in first");
    }
  };

  const handleChange = (e) => {
    setIsDisable(e.target.value.trim() === "");
  };
  const statsDats = [{ name: "Posts", value: 10 }, { name: "Comments", value: 20 }, { name: "Users", value: 30 }];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; 
  const renderCustomLabel = ({ name, value }) => `${name}: ${value}`;
  // console.log(isAdmin)
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      {/* Profile Section */}
      <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto mb-8">
        <div className="flex flex-col items-center">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-28 h-28 rounded-full mb-4 border-4 border-blue-400"
          />
          <h1 className="text-2xl font-semibold flex items-center gap-3 text-gray-800">
            {user.displayName}
            {userDetails?.userAdmin ? (
              <RiAdminFill className="text-green-500" />
            ) : (
              <MdWorkspacePremium
                className={`${userDetails?.userSubscription ? "text-orange-400" : "text-gray-500"
                  } text-xl`}
              />
            )}
          </h1>
          <p className="text-gray-600 text-lg "> {user.email}</p>
        </div>
      </div>

      {/* User Posts */}
      {!isAdmin && <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          My Recent Posts
        </h2>
        {userPosts?.length > 0 ? (
          <div className="space-y-4">
            {userPosts.map((post, idx) => (
              <div
                key={idx}
                className="bg-gray-50 shadow-sm rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {post.postTitle}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{post.postDescription}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(post.postTime).toLocaleString()}
                  </span>
                  <div className="flex items-center gap-4">
                    <button className="text-green-500 flex items-center gap-1">
                      {post.postUpVote} <BiSolidUpvote />
                    </button>
                    <button className="text-red-500 flex items-center gap-1">
                      {post.postDownVote} <BiSolidDownvote />
                    </button>
                    <Link to={`/comments/${post._id}`} className="text-blue-400 hover:text-blue-500 btn">
                      View
                    </Link >
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            No posts yet <FaSadTear className="text-yellow-500 inline-block" />
          </p>
        )}
      </div>}

      {/* Admin Stats */}
      {isAdmin  && statsData && (
        <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Admin Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 shadow-sm rounded-lg p-4 text-center">
              <FaLayerGroup className="text-3xl text-blue-500 mb-2" />
              <h3 className="font-semibold text-lg">Total Posts</h3>
              <p className="text-2xl">{statsData.postsCount}</p>
            </div>
            <div className="bg-gray-50 shadow-sm rounded-lg p-4 text-center">
              <TfiComments className="text-3xl text-blue-500 mb-2" />
              <h3 className="font-semibold text-lg">Total Comments</h3>
              <p className="text-2xl">{statsData.commentCount}</p>
            </div>
            <div className="bg-gray-50 shadow-sm rounded-lg p-4 text-center">
              <FaUsers className="text-3xl text-blue-500 mb-2" />
              <h3 className="font-semibold text-lg">Total Users</h3>
              <p className="text-2xl">{statsData.usersCount}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <PieChart width={400} height={350}>
              <Pie data={[{ name: "Total Posts", value: statsData.postsCount }, { name: "Total Users", value: statsData.usersCount }, { name: "Total Comments", value: statsData.commentCount }]} dataKey="value" cx="50%" cy="50%" innerRadius={0} outerRadius={80} fill="#82ca9d" label={renderCustomLabel} >
                {[{ name: "Total Posts", value: statsData.postsCount }, { name: "Total Users", value: statsData.usersCount }, { name: "Total Comments", value: statsData.commentCount }].map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))} </Pie> <Tooltip />
            </PieChart>
          </div>
          {/* Add Tag Section */}
          <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Add Tag</h2>
            <form onSubmit={handleAddTag}>
              <input
                id="comment"
                name="comment"
                onChange={handleChange}
                placeholder="Enter Tag Name"
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                maxLength={15}
                required
              />
              <button
                type="submit"
                disabled={isDisable}
                className={`mt-4 px-6 py-2 text-white font-medium rounded-md ${isDisable ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                Add Tag
              </button>
            </form>
          </div>

        </div>
      )}


    </div>
  );
};

export default MyProfile;
