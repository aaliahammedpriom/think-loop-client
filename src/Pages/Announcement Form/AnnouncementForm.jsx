import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AnnouncementForm = () => {
    const navigate = useNavigate();
    const { user,announcementsLength, setAnnouncementsLength } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const announcementsInfo = {
            authorName: data.authorName,
            authorImage: data.authorImage,
            title: data.title,
            description: data.description
        }
        // console.log('Form Data:', announcementsInfo);
        const res = await axiosSecure.post('/announcements', announcementsInfo)
        if (res.data.insertedId) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "announcement submitted successfully!",
                showConfirmButton: false,
                timer: 1000
              },1000);
            navigate('/')
        }
        

    };
    // console.log(announcementsLength)

    return (
        <div className="p-6 bg-base-200 min-h-screen flex justify-center items-center">
            <div className="card w-full max-w-md shadow-xl bg-white p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Announcement</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


                    {/* Author Name */}
                    <div className="form-control">
                        <label htmlFor="authorName" className="label">
                            <span className="label-text">Author Name</span>
                        </label>
                        <input
                            type="text"
                            id="authorName"
                            defaultValue={user?.displayName}
                            readOnly
                            className="input input-bordered w-full"
                            {...register('authorName', {
                                required: 'Author name is required',
                                minLength: {
                                    value: 3,
                                    message: 'Name must be at least 3 characters long',
                                },
                            })}
                        />
                        {errors.authorName && (
                            <span className="text-error text-sm">{errors.authorName.message}</span>
                        )}
                    </div>

                    {/* Author Image */}
                    <div className="form-control">
                        <label htmlFor="authorImage" className="label">
                            <span className="label-text">Author Image</span>
                        </label>
                        <input
                            type="url"
                            id="authorImage"
                            defaultValue={user?.photoURL}
                            readOnly
                            className="file-input file-input-bordered w-full"
                            {...register('authorImage', { required: 'Author image is required' })}
                        />
                        {errors.authorImage && (
                            <span className="text-error text-sm">{errors.authorImage.message}</span>
                        )}
                    </div>

                    {/* Title */}
                    <div className="form-control">
                        <label htmlFor="title" className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="input input-bordered w-full"
                            {...register('title', {
                                required: 'Title is required',
                                maxLength: {
                                    value: 50,
                                    message: 'Title cannot exceed 50 characters',
                                },
                            })}
                        />
                        {errors.title && (
                            <span className="text-error text-sm">{errors.title.message}</span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label htmlFor="description" className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            id="description"
                            className="textarea textarea-bordered w-full"
                            {...register('description', {
                                required: 'Description is required',
                                minLength: {
                                    value: 10,
                                    message: 'Description must be at least 10 characters long',
                                },
                            })}
                        />
                        {errors.description && (
                            <span className="text-error text-sm">{errors.description.message}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-4">
                        <button type="submit" className="btn btn-primary w-full">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AnnouncementForm;