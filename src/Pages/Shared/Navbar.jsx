import React from 'react';
import thinkloop from '../../assets/thinkloop.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAdmin from '../../Hooks/useAdmin';
import { MdDarkMode } from 'react-icons/md';
import { CiLight } from 'react-icons/ci';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const locationDashboard = location.pathname.includes('/dashboard')
    const { user, handleSignOut, announcementsLength, toggle, setToggle} = useAuth();
    const [isAdmin] = useAdmin()
    const handleToggle =()=>{
        setToggle(!toggle)
    }
    const links = <>

        {
            !locationDashboard && <>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={'/membership'} >Membership</Link></li>
            </>
        }
        {
            locationDashboard && !isAdmin && <>
                <li><Link to={`/dashboard/myprofile/${user?.email}`}>My Profile</Link></li>
                <li><Link to={`/dashboard/addpost/${user?.email}`}>Add Post</Link></li>
                <li><Link to={"/dashboard/mypost"}>My Posts</Link></li>
            </>
        }
        {
            locationDashboard && isAdmin && <>
                <li><Link to={`/dashboard/adminprofile/${user?.email}`}>Admin Profile</Link></li>
                <li><Link to={`/dashboard/admin/manageusers`}>Manage User</Link></li>
                <li><Link to={"/dashboard/admin/activities"} >Activities</Link></li>
                <li><Link to={`/dashboard/admin/announcement`}>Announcment</Link></li>
            </>
        }

    </>
    return (
        <div className="navbar bg-base-100 fixed top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>

                <Link to={'/'} className="btn btn-ghost text-2xl uppercase font-bold flex items-center"><img className='h-10 rounded-full' src={thinkloop} alt="" /> <span className='max-md:hidden'>Think Loop</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className='navbar-end'>
            <button onClick={handleToggle} className=' mx-3'>{toggle ? <CiLight className='text-yellow-300 text-3xl' /> : <MdDarkMode className='text-yellow-300 text-3xl' />}</button>
                {
                    user?.email ? <><button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item">{announcementsLength}</span>
                        </div>
                    </button>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    {
                                        user?.photoURL && <img src={user.photoURL} alt="" />

                                    }
                                    {
                                        !user?.photoURL && <img
                                            alt="Tailwind CSS Navbar component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    }
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li className='text-blue-600'>
                                    {user?.displayName}
                                </li>
                                <li><Link to={`/dashboard/${isAdmin?'adminprofile':'myprofile'}/${user.email}`} >DashBoard</Link></li>
                                <li><button onClick={() => { handleSignOut().then(() => navigate('/')) }}>Logout</button></li>
                            </ul>
                        </div></> : <div>
                        <Link to={'/joinus'} className='btn'>Join Us</Link>
                    </div>
                }


            </div>
        </div>
    );
};

export default Navbar;