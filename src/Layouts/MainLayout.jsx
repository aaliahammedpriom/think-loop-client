import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';
import Navbar from '../Pages/Shared/Navbar';
import useAuth from '../Hooks/useAuth';

const MainLayout = () => {
    const {toggle} =useAuth();
    console.log(toggle)

    return (
        <div data-theme={toggle ? "dark" : "light"}>
            <Navbar></Navbar>
            <div className='min-h-screen pt-20'>
                <Outlet ></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;