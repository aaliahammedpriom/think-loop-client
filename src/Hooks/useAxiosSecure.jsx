import axios from "axios";

const axiosSecure = axios.create({
    baseURL: `https://thinkloop-server.vercel.app`
})
const useAxiosSecure = () => {
    // const navigate = useNavigate();
    // const {handleSignOut} =useAuth();
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access_token')
        config.headers.authorization = `Bearer ${token}`
        // console.log("request stop by interceptors")
        // console.log(config)
        return config
    }, (error) => {
        return Promise.reject(error)
    })
    axiosSecure.interceptors.response.use((response) => {
        return response
    }, (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            // handleSignOut();
            // navigate('/error')
            // alert("error")
        }
        return Promise.reject(error)
    })
    return axiosSecure;
};

export default useAxiosSecure;