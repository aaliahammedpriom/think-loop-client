
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';


const SocialLogIn = () => {
    const { handleGoogleSignInWithPopup } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    // console.log(location?.state?.from)

    const handleGoogleLoginButton = () => {
        handleGoogleSignInWithPopup()
            .then(async (res) => {
                if (res.user?.email) {
                    const user = {
                        userName: res.user.displayName,
                        userEmail: res.user.email,
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
                                    timer: 1500
                                });


                            }
                            else {
                                Swal.fire({
                                    position: "top",
                                    icon: "success",
                                    title: "Welcome Back.",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                            navigate(location.state?.from?.pathname || '/');
                        })
                }
            })
    }

    return (
        <div className="flex justify-center gap-4">
            <button onClick={handleGoogleLoginButton} className="btn btn-circle">
                <FcGoogle className='text-5xl'></FcGoogle>
            </button>
        </div>
    );
};

export default SocialLogIn;
