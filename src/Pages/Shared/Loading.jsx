import React from 'react';
import useAuth from '../../Hooks/useAuth';

const Loading = ({ children }) => {
    const { loading } = useAuth();
    // console.log(loading)
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <progress className="progress progress-info w-56"></progress>
                <p className="mt-4 text-info">Loading, please wait...</p>
            </div>
        )
    }
    if (!loading) {
        return children
    }
};

export default Loading;