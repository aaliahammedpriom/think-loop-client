import {
  createBrowserRouter
} from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import JoinUs from "../Pages/Join Us/Log In/JoinUs";
import SignUp from "../Pages/Join Us/Sign Up/SignUp";
import MyProfile from "../Pages/My Profile/MyProfile";
import MyPosts from "../Pages/My Posts/MyPosts";
import AddPost from "../Pages/Add Post/AddPost";
import Dashboard from "../Layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import MyPostComment from "../Pages/My Post Comment/MyPostComment";
import Comments from "../Pages/Comments/Comments";
import Membership from "../Pages/Membership/Membership";
import ManageUsers from "../Pages/Manage Users/ManageUsers";
import AnnouncementForm from "../Pages/Announcement Form/AnnouncementForm";
import Loading from "../Pages/Shared/Loading";
import Activities from "../Pages/Activities/Activities";
import Error from "../Pages/Shared/Error";
import AdminRoutes from "./AdminRoutes";
import useAxiosSecure from "../hooks/useAxiosSecure";

const axiosSecure = useAxiosSecure();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/comments/:id',
        element: <Loading><Comments></Comments></Loading>
      },
      {
        path: '/membership',
        element: <PrivateRoute><Membership></Membership></PrivateRoute>
      },
      {
        path: '/joinus',
        element: <JoinUs></JoinUs>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: "*",
        element: <Error />,
      },
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: '/dashboard/myprofile/:email',
        element: <MyProfile></MyProfile>,

      },
      {
        path: '/dashboard/comments/:id',
        element: <Loading><Comments></Comments></Loading>,

      },
      {
        path: '/dashboard/addpost/:email',
        element: <AddPost></AddPost>,
        loader: async ({ params }) => {
          const [userRes, tagsRes] = await Promise.all([
            axiosSecure.get(`/users/${params.email}`),
            axiosSecure.get(`/tags`),
          ])
          return { userDetails: userRes.data, tags: tagsRes.data }
        }
      },
      {
        path: '/dashboard/mypost',
        element: <MyPosts></MyPosts>
      },
      {
        path: '/dashboard/comments/:id',
        element: <MyPostComment></MyPostComment>
      },
      {
        path: '/dashboard/adminprofile/:email',
        element: <AdminRoutes><MyProfile></MyProfile></AdminRoutes>,

      },
      {
        path: '/dashboard/admin/manageusers',
        element: <AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
      },
      {
        path: '/dashboard/admin/activities',
        element: <AdminRoutes><Activities></Activities></AdminRoutes>
      },
      {
        path: '/dashboard/admin/announcement',
        element: <AdminRoutes><AnnouncementForm></AnnouncementForm></AdminRoutes>
      },
      {
        path: "*",
        element: <Error />,
      },
    ]
  },
]);