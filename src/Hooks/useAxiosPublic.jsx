import axios from 'axios';
const axiosPublic = axios.create({
    baseURL : `https://thinkloop-server.vercel.app`
})
const useAxiosPublic = () => {
    return  axiosPublic;
};

export default useAxiosPublic;