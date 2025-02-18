import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import CommentDescription from '../Comments/CommentDescription';

const Announcement = () => {
  const { announcementsLength, setAnnouncementsLength, toggle } = useAuth();
  const [anouncementHide, setAnouncementHide] = useState(false);
  const axiosPublic = useAxiosSecure();

  const { data: announcements = [], refetch } = useQuery({
    queryKey: ['announcements', announcementsLength, setAnnouncementsLength],
    queryFn: async () => {
      const res = await axiosPublic.get('/announcements');
      setAnnouncementsLength(res.data.length);
      return res.data;
    },
  });

  if (announcements.length) {
    return (
      <div className="mx-auto p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex ">
          
          <button
            onClick={() => setAnouncementHide(!anouncementHide)}
            className={`btn bg-blue-400 text-white px-4 py-2 rounded-lg ${anouncementHide ? "border-r-0 rounded-r-none" : ""}`}
          >
            {anouncementHide ? 'See All' : 'Hide Announcements'}
          </button>
          {anouncementHide ? (
            <p className='btn bg-slate-400 border-l-0 rounded-l-none'>Total Announcements: {announcements.length}</p>
          ) : (
            ''
          )}
        </h2>

        {!anouncementHide && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-2">
            {announcements.map((announcement) => (
              <div
                key={announcement._id}
                className="flex shadow-lg rounded-lg overflow-hidden"
              >
                {/* Left Image Section */}
                <div className="w-1/3 p-2 flex justify-center items-center">
                  <img
                    src={announcement.authorImage}
                    alt="Author"
                    className="w-16 h-16 rounded-full border-2 border-white"
                  />
                </div>

                {/* Right Content Section */}
                <div className="w-2/3 p-4 flex flex-col justify-center">
                  <div className="text-lg font-semibold">
                    {announcement.authorName}
                  </div>
                  <div className="text-sm font-medium ">
                   Subject:  {announcement.title}
                  </div>
                  <div className='mr-2'>
                    <CommentDescription commentDetails={announcement.description}></CommentDescription>
                  {/* <p className="text-sm text-gray-300 mt-2">
                    {announcement.description}
                  </p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`max-w-md mx-auto p-6  shadow-lg rounded-lg ${toggle? "bg-dark": ''}`}>
      <h2 className="text-xl font-semibold text-center ">
        No Announcements Available
      </h2>
    </div>
  );
};

export default Announcement;
