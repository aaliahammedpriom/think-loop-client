import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogIn from '../../social login/SocialLogIn';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const JoinUs = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {handleSignInWithEmailAndPassword} =useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        handleSignInWithEmailAndPassword(formValues.email , formValues.password)
        .then(res=>{
            if(res && res?.user?.email){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Welcome Back",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            navigate(location.state?.from?.pathname || '/');

            // console.log(res.user)
        })
        .catch(error=>{
            if(error.code === "auth/invalid-credential"){
                Swal.fire({
                    position: "top",
                    icon: "erroe",
                    title: "Doesn't meet credential try again",
                    showConfirmButton: false,
                    timer: 1500
                });
                // alert("Doesn't meet credential try again")
            }
            // console.log(error)
        })
        // console.log(formValues);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="card bg-white w-full max-w-sm p-6 shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-center text-blue-700 mb-4">Join Us</h1>
                <form onSubmit={handleLogin} className="card-body p-0">
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text text-gray-700">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            className="input input-bordered w-full"
                            value={formValues.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text text-gray-700">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                name="password"
                                className="input input-bordered w-full pr-10"
                                value={formValues.password}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2/4 transform -translate-y-2/4 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover text-blue-600">
                                Forgot password?
                            </a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary w-full">Login</button>
                    </div>
                </form>
                <p className="text-sm text-center mt-4 text-gray-600">
                    New here?{' '}
                    <Link to="/signup" className="text-blue-600 underline">
                        Create a New Account
                    </Link>
                </p>
                <div className="divider mt-6">Or sign in with</div>
                <SocialLogIn />
            </div>
        </div>
    );
};

export default JoinUs;
