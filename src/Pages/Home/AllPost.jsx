import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PostCart from '../Post Cart/PostCart';
import Loading from '../Shared/Loading';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const AllPost = ({ search, poularity }) => {
    const { toggle} = useAuth();
    const axiosPublic = useAxiosPublic();
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);

    const { data = [], refetch } = useQuery({
        queryKey: ['posts', search, poularity, currentPage, itemsPerPage, numberOfPages],
        queryFn: async () => {
            const postRes = await axiosPublic.get(`/publicposts?search=${search}&poularity=${poularity}&skip=${currentPage}&limit=${itemsPerPage}`);
            // console.log(postRes.data.totalPosts)
            setNumberOfPages(Math.ceil(postRes.data.totalPosts / itemsPerPage));
            return { posts: postRes.data.result , postCount: postRes.data.totalPosts };
        }
    });
    useEffect(() => {
        setCurrentPage(0);
    }, [search, poularity]);

    const { posts, postCount } = data;
    const pages = [...Array(numberOfPages).keys()]
    // console.log(pages)

    if (posts) {
        return (
            <div div className={`min-h-screen p-6 ${toggle ? 'bg-dark': ''}`}>
                <div className="max-w-full mx-auto">
                    <div className="text-center mb-6">
                        <span className="text-lg font-semibold">Results Found: </span>
                        <span className="text-xl font-bold text-blue-600">{postCount}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <PostCart key={post._id} post={post} />
                        ))}
                    </div>
                    <div className='flex flex-wrap justify-center mt-10 gap-1 '>
                        <button onClick={() => { (pages.includes(currentPage - 1)) && setCurrentPage(currentPage - 1) }} className={`btn bg-blue-400 btn-sm ${toggle? "text-white": 'text-black'}`}> Previous Page</button>
                        {pages.map(page => <button key={page} onClick={() => { setCurrentPage(page) }} className={` btn btn-sm ${toggle? "text-white": 'text-black'} ${(currentPage === page) ? 'bg-blue-400 border-2 border-solid border-blue-800' : 'bg-blue-400'} `}>{page + 1}</button>)
                        }
                        <button onClick={() => { (pages.includes(currentPage + 1)) && setCurrentPage(currentPage + 1) }} className={`btn bg-blue-400 btn-sm ${toggle? "text-white": 'text-black'}`}> Next Page</button>
                    </div>
                </div>
            </div>
        );
    }
    return <Loading></Loading>
};

export default AllPost;
