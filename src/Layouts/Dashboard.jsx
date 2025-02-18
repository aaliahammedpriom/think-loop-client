import React from 'react';
import Navbar from '../Pages/Shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';
import useAuth from '../Hooks/useAuth';

const Dashboard = () => {
    const {toggle}= useAuth()
    return (
        <div data-theme={toggle ? "dark" : "light"} >
            <Navbar></Navbar>
            <div className='min-h-screen pt-20'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;