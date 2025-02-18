import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ActivitiesCard from './ActivitiesCard';

const Activities = () => {
    const axiosSecure = useAxiosSecure();
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const { data = [], refetch } = useQuery({
        queryKey: ['postDetails',currentPage],
        queryFn: async () => {
            const [reportsRes] = await Promise.all([
                axiosSecure.get(`/reports?skip=${currentPage}&limit=${itemsPerPage}`)
            ])
            setNumberOfPages(Math.ceil(reportsRes.data.totalActivities / itemsPerPage));
            // console.log(reportsRes.data)
            return { reportsDatas: reportsRes.data.result }
        }
    });
    const pages = [...Array(numberOfPages).keys()]
    // console.log(pages)
    const { reportsDatas } = data;
    // console.log(reportsDatas)
    if (reportsDatas) {
        return (
            <div>
                <div className="overflow-x-auto p-10">
                <div className='flex flex-wrap justify-left mt-10 gap-1'>
                        <button onClick={() => { (pages.includes(currentPage - 1)) && setCurrentPage(currentPage - 1) }} className='btn bg-blue-400 btn-sm'> {"<<"}</button>
                        {pages.map(page => < button key={page} onClick={() => { setCurrentPage(page) }} className={` btn btn-sm ${(currentPage === page) ? 'bg-blue-400 border-2 border-solid border-blue-800' : 'bg-blue-400'}`}>{page + 1}</button>)
                        }
                        <button onClick={() => { (pages.includes(currentPage + 1)) && setCurrentPage(currentPage + 1) }} className='btn bg-blue-400 btn-sm'> {`>>`}</button>
                    </div>
                    <table className="table w-full border-collapse border border-blue-400">
                        {/* Table Head */}
                        <thead>
                            <tr className="bg-blue-400 text-white">
                                <th className="border border-blue-400">Post Title</th>
                                
                                <th className="border border-blue-400">Comment Details</th>
                                <th className="border border-blue-400">User Name</th>
                                <th className="border border-blue-400">Feedback</th>

                                <th className="border border-blue-400">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {
                                reportsDatas.map(reportsData => <ActivitiesCard key={reportsData._id} reportsData={reportsData} refetch={refetch}></ActivitiesCard>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    return (
        <div>
        </div>
    );
};

export default Activities;