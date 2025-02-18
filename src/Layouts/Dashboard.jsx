import React from 'react';
import Navbar from '../Pages/Shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';

const Dashboard = () => {
    return (
        <div data-theme="light" >
            <Navbar></Navbar>
            <div className='min-h-screen pt-20'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;