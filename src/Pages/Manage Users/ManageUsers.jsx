import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdWorkspacePremium } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const { data = [], refetch } = useQuery({
    queryKey: [search, currentPage],
    queryFn: async () => {
      const res = await axiosSecure(`/users?search=${search}&skip=${currentPage}&limit=${itemsPerPage}`);
      setNumberOfPages(Math.ceil(res.data.totalUsers / itemsPerPage));
      return res.data.result;
    },
  });
  const pages = [...Array(numberOfPages).keys()]
  // console.log(data)

  const handleChange = async (userName ,id, userEmail, userAdmin) => {
    if (userEmail === user.email) {
      Swal.fire({
        title: "You can't remove yourself from admin",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: `${userAdmin ? "Make Admin !" : "Remove Admin !"}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `${userAdmin ? "Yes, Add !" : "Yes, Remove !"}`
      }).then(async(result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.patch(`/users/${id}`, { userAdmin })
          if(res.data.modifiedCount>0){
            refetch();
            Swal.fire({
              title: "Success!",
              text: `${userName} is ${userAdmin ? "Admin" : "Removed from Admin"}`,
              icon: "success"
            });
          }
          
        }
      });
    }
  };

  const handleSearchBox = (e) => {
    e.preventDefault();
    setCurrentPage(0)
    setSearch(e.target.value);
  };


  return (
    <div className="p-6">
      {/* Search Section */}
      <section className="flex justify-center mb-6">
        <div className="form-control w-full md:w-1/3">
          <label className="input-group">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full"
              value={search}
              onChange={handleSearchBox}
            />
            <span className="bg-blue-400 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </label>
        </div>
      </section>

      <div className='flex flex-wrap justify-left mt-10 gap-1'>
        <button onClick={() => { (pages.includes(currentPage - 1)) && setCurrentPage(currentPage - 1) }} className='btn bg-blue-400 btn-sm'> {"<<"}</button>
        {pages.map(page => <button key={page} onClick={() => { setCurrentPage(page) }} className={` btn btn-sm ${(currentPage === page) ? 'bg-blue-400 border-2 border-solid border-blue-800' : 'bg-blue-400'}`}>{page + 1}</button>)
        }
        <button onClick={() => { (pages.includes(currentPage + 1)) && setCurrentPage(currentPage + 1) }} className='btn bg-blue-400 btn-sm'> {`>>`}</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border-collapse border border-blue-400">

          <thead>
            <tr className="bg-blue-400 text-white text-center">
              <th>#</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Role</th>
              <th>Subscription</th>
            </tr>
          </thead>

          <tbody>
            {data.map((user, idx) => (
              <tr key={user._id} className="text-center">
                <th className="border border-blue-400">{idx + 1}</th>
                <td className="border border-blue-400">{user.userName}</td>
                <td className="border border-blue-400">{user.userEmail}</td>
                <td className="border border-blue-400">
                  {user.userAdmin ? (
                    <button
                      onClick={() =>
                        handleChange(user.userName, user._id, user.userEmail, false)
                      }
                      className="btn btn-sm bg-blue-400 text-white hover:bg-blue-600 w-full">

                      Admin
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleChange(user.userName ,user._id, user.userEmail, true)
                      }
                      className="btn btn-sm bg-gray-200 text-gray-800 hover:bg-gray-400 w-full">

                      User
                    </button>
                  )}
                </td>
                <td className="border border-blue-400">
                  <h1 className="text-sm md:text-lg font-semibold flex justify-center items-center gap-2">
                    {user.displayName}
                    <MdWorkspacePremium
                      className={`${user.userSubscription
                        ? "text-orange-300"
                        : "text-gray-700"
                        } text-xl md:text-2xl`}
                    />
                  </h1>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
