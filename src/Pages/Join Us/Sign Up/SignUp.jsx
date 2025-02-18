import React, { useState } from 'react';
import SocialLogIn from '../../social login/SocialLogIn';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
// import axios from 'axios';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();
    const location = useLocation();
    const { handleCreateUserWithEmailAndPassword, handleUpdateProfile } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { name, email, photoURL, password } = data;

        handleCreateUserWithEmailAndPassword(email, password)
            .then(async (res) => {
                if (res && res.user?.email) {
                    // console.log(email)
                    handleUpdateProfile(name, photoURL)
                    const user = {
                        userName: name,
                        userEmail: email,
                        userAdmin: false,
                        userSubscription: false,
                    }
                    await axiosPublic.post(`/users`, user)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire({
                                    position: "top",
                                    icon: "success",
                                    title: "Thank's for join us .",
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            }
                            else {
                                Swal.fire({
                                    position: "top",
                                    icon: "success",
                                    title: "Welcome Back .",
                                    showConfirmButton: false,
                                    timer: 2000
                                });

                            }
                            navigate(location.state?.from?.pathname || '/');

                        })
                }
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Swal.fire({
                        position: "top",
                        icon: "error",
                        title: "This email is already in use.",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                if (error.code === 'auth/network-request-failed') {
                    Swal.fire({
                        position: "top",
                        icon: "error",
                        title: "Check Internet Connection .",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                // else {
                //     alert('Somthing Is wrong');
                // }
                // console.error('Error:', error.code);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="card bg-white w-full max-w-md shadow-lg rounded-lg border border-gray-200">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-4">
                    <h2 className="text-2xl font-bold text-center text-blue-600">Create Your Account</h2>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered focus:outline-none focus:ring focus:ring-blue-300"
                            {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered focus:outline-none focus:ring focus:ring-blue-300"
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="url"
                            placeholder="Enter your photo URL"
                            className="input input-bordered focus:outline-none focus:ring focus:ring-blue-300"
                            {...register('photoURL', { required: 'Photo URL is required' })}
                        />
                        {errors.photoURL && <p className="text-red-500 text-sm">{errors.photoURL.message}</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className="input input-bordered focus:outline-none focus:ring focus:ring-blue-300 w-full"
                                {...register('password', {
                                    required: 'Password is required',
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
                                        message:
                                            'Password must have at least 6 characters, including 1 uppercase, 1 lowercase, and 1 special character.',
                                    },
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible((prev) => !prev)}
                                className="absolute right-3 top-3 text-blue-600"
                            >
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>


                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary w-full">Sign Up</button>
                    </div>
                </form>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link to={"/joinus"} className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>

                <div className="divider mt-4">Or sign in with</div>
                <SocialLogIn />
            </div>
        </div>
    );
};

export default SignUp;
