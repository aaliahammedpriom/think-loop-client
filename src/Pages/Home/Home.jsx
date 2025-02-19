import React, { useState } from 'react';
import Announcement from './Announcement';
import AllPost from './AllPost';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Shared/Loading';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import ReviewSlider from './ReviewSlider';
import ForumTrivia from './ForumTrivia';
import ForumFaq from './ForumFaq';
import ContactUs from './ContactUs';
import Legal from './Legal';

const Home = () => {
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState('');
    const [poularity, setPoularity] = useState(false);
    
    const { data: tags = [] } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tags')
            return res.data
        }

    })
    if (!tags) {
        return <Loading></Loading>
    }
    const handleTag = (tag) => {
        setPoularity(false)
        setSearch(tag)

    }
    const handleSearchBox = (e) => {
        e.preventDefault()
        setPoularity(false)
        setSearch(e.target.value.toUpperCase())
    }
    return (
        <div>
            {/* Search bar */}
            <section className='flex flex-wrap justify-center gap-2 p-2'>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input onChange={handleSearchBox} defaultValue={search} type="text" className="grow" placeholder="Search" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
                <div className='flex gap-2'>
                    <div className='flex flex-wrap gap-2'>
                        {
                            tags.map(tag => <button key={tag} className='btn' onClick={() => handleTag(tag.tag)}>{tag.tag}</button>)
                        }
                    </div>
                    <div>
                        <button onClick={() => {
                            setPoularity(!poularity)
                            setSearch("")
                        }} className='btn'>{poularity? "Shorted By Poularity": "Short By Poularity"}</button>
                    </div>
                </div>
            </section>
            <section >
                <Announcement></Announcement>
            </section>
            <section>
                <AllPost search={search} poularity={poularity}></AllPost>

            </section>
            <section>
                <ReviewSlider></ReviewSlider>
                <ForumTrivia></ForumTrivia>
                <ForumFaq></ForumFaq>
                <ContactUs></ContactUs>
                <Legal></Legal>
            </section>
        </div>
    );
};

export default Home;