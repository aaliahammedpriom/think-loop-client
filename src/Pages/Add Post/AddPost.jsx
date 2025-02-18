import React from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Shared/Loading";
import Swal from "sweetalert2";

const AddPost = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { userDetails, tags } = useLoaderData();

  if (!tags) {
    // console.log('loading');
  }

  const tagOption = tags.map(tag => ({ value: tag.tag, label: tag.tag }));

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { data: userPosts = [], refetch } = useQuery({
    queryKey: ['userDetails', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${user?.email}`)
      return res.data.result;
    }
  });

  const onSubmit = async (data) => {
    const post = {
      authorName: user?.displayName,
      authorImage: user?.photoURL,
      authorEmail: user?.email,
      postTitle: data.postTitle,
      postDescription: data.postDescription,
      postTag: data.postTag.value,
      postTime: new Date().toISOString(),
      postUpVote: 0,
      postDownVote: 0,
    };

    const res = await axiosSecure.post(`/posts`, post);
    if (res.data.insertedId) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Your post has been saved",
        showConfirmButton: false,
        timer: 1000
      });

      // reset();
      refetch();
    }
  };
  const handleTagChange = (selectedOption) => {
    setValue("postTag", selectedOption);
  };


  if (userPosts.length < 5 || userDetails.userSubscription || userDetails.userAdmin) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Create a New Post</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Post Title */}
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700">Post Title</label>
            <input
              type="text"
              placeholder="Enter post title"
              className="w-full px-4 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              {...register("postTitle", { required: true })}
            />
            {errors.postTitle && (
              <span className="text-red-500 text-sm">This field is required</span>
            )}
          </div>

          {/* Post Description */}
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700">Post Description</label>
            <textarea
              placeholder="Enter post description"
              className="w-full px-4 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              {...register("postDescription", { required: true })}
            ></textarea>
            {errors.postDescription && (
              <span className="text-red-500 text-sm">This field is required</span>
            )}
          </div>

          {/* Tag Selection */}
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700">Tag</label>
            <Select
              options={tagOption}
              onChange={handleTagChange}
              placeholder="Select a tag"
              className="text-sm"
              isClearable
              required
            />
            {errors.postTag && (
              <span className="text-red-500 text-sm">Please select a tag</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none transition"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    );
  }
  if (5 >= userPosts.length || !userDetails.userSubscription) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Join Our Community!</h2>
          <p className="text-gray-600 text-lg text-center mb-6">
            Becoming a member unlocks exclusive benefits, connects you with like-minded individuals, and gives you access to premium content.
          </p>
          <div className="text-center">
            <Link to="/membership" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Become a Member
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <Loading></Loading>

};

export default AddPost;
